import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Prediction } from '../types/Prediction';
import { MatchModel } from 'src/modules/admin/models/match.model';
import { Predice } from '../types/predice.type';
@Injectable()
export class PredictionModel {
  constructor(
    @Inject('PG_CONNECTION') private readonly pgClient: PoolClient,
    private readonly matchModel: MatchModel,
  ) {}

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

  async getPredictionIdByMatchAndUserId(
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

  async getPredictionIdByMatchId(
    matchId: number,
  ): Promise<Predice[]> {
    const { rows } = await this.pgClient.query(
      `
        SELECT * 
        FROM predice p 
        WHERE p.idpartido = $1 
        AND p.puntosobtenidos = 0;
      `,
      [matchId],
    );

    return rows;
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

  async createChampionAndRunnerUpPrediction(
    userId: number,
    championId: number,
    runnerUpId: number,
  ): Promise<void> {
    await this.pgClient.query(
      `
      INSERT INTO escampeon (idequipo, idalumno)
      VALUES ($1, $2);
      `,
      [championId, userId],
    );
    await this.pgClient.query(
      `
      INSERT INTO essubcampeon (idequipo, idalumno)
      VALUES ($1, $2);
      `,
      [runnerUpId, userId],
    );
  }

  async insertMatchPrediction(
    matchId: number,
    userId: number,
    userLocalGoals: number,
    userAwayGoals: number,
  ) {
    await this.pgClient.query(
      `
        INSERT INTO predice
        (idalumno, idpartido, goleslocal, golesvisitante)
        VALUES($1, $2, $3, $4);
      `,
      [userId, matchId, userLocalGoals, userAwayGoals],
    );
  }

  async updatePredictionPoints(
    matchId: number,
    userId: number,
    userLocalGoals: number,
    userAwayGoals: number,
  ) {
    const match = await this.matchModel.getById(matchId);
    const points = this.getPredictionPoints(
      match.goleslocal,
      match.golesvisitante,
      userLocalGoals,
      userAwayGoals,
    );
    await this.pgClient.query(
      `
        UPDATE predice
        SET puntosobtenidos=$1
        AND idalumno=$2 
        AND idpartido=$3;
      `,
      [points, userId, matchId],
    );
  }

  async getPredictionPoints(
    matchLGoals: number,
    matchAGoals: number,
    predictedLGoals: number,
    predictedAGoals: number,
  ): Promise<number> {
    if (matchLGoals === predictedLGoals && matchAGoals === predictedAGoals) {
      return 4;
    }

    if (
      (matchLGoals >= matchAGoals && predictedLGoals >= predictedAGoals) ||
      (matchLGoals <= matchAGoals && predictedLGoals <= predictedAGoals) ||
      (matchLGoals === matchAGoals && predictedLGoals === predictedAGoals)
    ) {
      return 2;
    }

    return 0;
  }
}
