import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Country } from '../types/country.type';
import { CreateMatchDto } from '../dtos/create-match.dto';
import { Match } from '../types/match.type';

@Injectable()
export class MatchModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAllMatchToPlay(): Promise<Country[]> {
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

  async create(
    date: string,
    stage: string,
    stadiumId: number,
    localTeamId: number,
    awayTeamId: number
  ): Promise<void> {
    const { rows } = await this.pgClient.query(
        `
            INSERT INTO partido
            (fecha, etapa, idestadio, idequipolocal, idequipovisitante)
            VALUES($1, $2, $3, $4, $5);
        `,
        [date, stage, stadiumId, localTeamId, awayTeamId]
    );
  }

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

    if (userData) {
        // Lógica para sumar puntos
    }
  }

  async update(
    id: number,
    name: string,
    confederation: string
  ): Promise<Country> {
    const countryUpdateResult = await this.pgClient.query(
      'UPDATE pais SET nombre = $1, confederacion = $2 WHERE id = $3 RETURNING *;',
      [name, confederation, id],
    );

    return countryUpdateResult.rows[0];
  }
}
