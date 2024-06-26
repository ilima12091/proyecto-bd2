import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Prediction } from '../types/Prediction';

@Injectable()
export class PredictionModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getPredictionsByUserId(userId: number): Promise<Prediction[]> {
    const { rows } = await this.pgClient.query(
      `
      SELECT pr.id as id, pr.goleslocal as "homePrediction", pr.golesvisitante as "awayPrediction",
      p.fecha as date, eloc.nombre as home, eVis.nombre as away, p.goleslocal as "homeGoals", p.golesvisitante as "awayGoals", p.etapa as stage,
      p.id as "matchId", eloc.urllogo as "homeFlag", eVis.urllogo as "awayFlag"
      FROM partido p
      INNER JOIN equipo as eloc on p.idequipolocal = eloc.id 
      INNER JOIN equipo as evis on p.idequipovisitante = evis.id
      LEFT JOIN predice as pr ON p.id = pr.idPartido AND pr.idalumno = $1
      GROUP BY p.id, eloc.id, evis.id, pr.id
      ORDER BY p.fecha ASC;
      `,
      [userId],
    );

    return rows;
  }

  async createPrediction(
    userId: number,
    homeGoals: number,
    awayGoals: number,
    matchId: number,
  ): Promise<void> {
    await this.pgClient.query(
      `
      INSERT INTO predice (idalumno, idpartido, goleslocal, golesvisitante)
      VALUES ($1, $2, $3, $4);
      `,
      [userId, matchId, homeGoals, awayGoals],
    );
  }

  async getPredictionIdByMatchId(
    userId: number,
    matchId: number,
  ): Promise<number> {
    const { rows } = await this.pgClient.query(
      `
        SELECT pr.id
        FROM predice pr
        WHERE pr.idalumno = $1 AND pr.idpartido = $2;
      `,
      [userId, matchId],
    );

    return rows?.[0]?.id;
  }

  async updatePrediction(
    predictionId: number,
    homeGoals: number,
    awayGoals: number,
  ): Promise<void> {
    await this.pgClient.query(
      `
      UPDATE predice
      SET ${homeGoals ? 'goleslocal = $1,' : ''} ${awayGoals ? 'golesvisitante = $2' : ''}
      WHERE id = $3;
      `,
      [homeGoals, awayGoals, predictionId],
    );
  }
}
