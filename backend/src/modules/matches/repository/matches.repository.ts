import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Match } from '../models/Match';
import { CreateMatchDTO } from '../dtos/create-match-dto';

@Injectable()
export class MatchesRepository {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll(): Promise<Match[]> {
    const { rows } = await this.pgClient.query(
      'SELECT * FROM partido;'
    );
    return rows;
  }

  async create(createMatchDto: CreateMatchDTO): Promise<Match> {
    const { fecha, etapa, idEstadio, idEquipoLocal, idEquipoVisitante, golesLocal, golesVisitante } = createMatchDto;

    const matchInsertResult = await this.pgClient.query(
      'INSERT INTO partido (fecha, etapa, idestadio, idequipolocal, idequipovisitante) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [fecha, etapa, idEstadio, idEquipoLocal, idEquipoVisitante],
    );
    return matchInsertResult.rows[0];
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
      [id]
    );
    console.log(rows);
    return rows[0];
  }
  //TODO: Proteger ADMIN
  async insertResult(
    matchId: number,
    localGoals: number,
    awayGoals: number
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
