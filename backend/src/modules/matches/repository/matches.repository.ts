import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Match } from '../models/Match';
import { CreateMatchDTO } from '../dtos/create-match-dto';

@Injectable()
export class MatchesRepository {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll(): Promise<Match[]> {
    const { rows } = await this.pgClient.query(
      `
        SELECT p.id, p.idEquipoLocal as home, p.idEquipoVisitante as away, p.fecha as date, p.golesLocal as "homeGoals", p.golesVisitante as "awayGoals", p.etapa as stage, eloc.nombre as "homeName", evis.nombre as "awayName", p.idEstadio as "stadiumId"
        FROM partido as p 
        INNER JOIN equipo as eloc ON p.idEquipoLocal = eloc.id
        INNER JOIN equipo as evis ON p.idEquipoVisitante = evis.id;`,
    );
    return rows;
  }

  async create(createMatchDto: CreateMatchDTO): Promise<Match> {
    const { date, stage, stadiumId, away, home } = createMatchDto;

    const matchInsertResult = await this.pgClient.query(
      'INSERT INTO partido (fecha, etapa, idestadio, idequipolocal, idequipovisitante) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [date, stage, stadiumId, away, home],
    );
    return matchInsertResult.rows[0];
  }

  async update(id: number, createMatchDto: CreateMatchDTO): Promise<Match> {
    const { date, stage, stadiumId, away, home, homeGoals, awayGoals } =
      createMatchDto;

    const matchData = await this.pgClient.query(
      'UPDATE partido SET fecha = $1, etapa = $2, idestadio = $3, idequipolocal = $4, idequipovisitante = $5, golesLocal = $7, golesVisitante = $8 WHERE id = $6 RETURNING *;',
      [date, stage, stadiumId, away, home, id, homeGoals, awayGoals],
    );
    return matchData.rows[0];
  }

  //Proteger ADMIN
  async delete(id: number): Promise<Match> {
    const matchData = await this.pgClient.query(
      'DELETE FROM partido WHERE id = $1 RETURNING *;',
      [id],
    );
    return matchData.rows[0];
  }

  //De Admin/Match
  async getAllMatchToPlay(): Promise<Match[]> {
    const { rows } = await this.pgClient.query(
      `
        SELECT * FROM partido
        WHERE goleslocal ISNULL AND golesvisitante ISNULL
      `,
    );
    return rows;
  }

  async getById(id: number): Promise<Match> {
    const { rows } = await this.pgClient.query(
      'SELECT * FROM partido WHERE id = $1;',
      [id],
    );
    return rows[0];
  }
  //TODO: Proteger ADMIN
  async insertResult(
    matchId: number,
    localGoals: number,
    awayGoals: number,
  ): Promise<void> {
    const resultInsertResult = await this.pgClient.query(
      `
        UPDATE partido
        SET goleslocal = $1, golesvisitante = $2
        WHERE id = $3;
      `,
      [localGoals, awayGoals, matchId],
    );
    const userData = resultInsertResult.rows[0];
    return userData;
  }
}
