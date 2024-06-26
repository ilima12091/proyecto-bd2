import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Campus } from '../types/campus.type';

@Injectable()
export class CampusModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll(): Promise<Campus[]> {
    const { rows } = await this.pgClient.query(
      'SELECT * FROM sede;',
    );
    return rows;
  }

  async getById(id: number): Promise<Campus> {
    const { rows } = await this.pgClient.query(
      'SELECT * FROM sede WHERE id = $1;',
      [id]
    );
    console.log(rows);
    return rows[0];
  }

  async create(
    city: string,
    state: string,
    countryId: number
  ): Promise<Campus> {
    const CampusInsertResult = await this.pgClient.query(
      'INSERT INTO sede (ciudad, estado, paisid) VALUES($1, $2, $3) RETURNING *;',
      [city, state, countryId],
    );
    const userData = CampusInsertResult.rows[0];

    return {
      ...userData,
      id: userData?.id,
    };
  }

  async update(
    id: number,
    city: string,
    state: string,
    countryId: number
  ): Promise<Campus> {
    const CampusUpdateResult = await this.pgClient.query(
      'UPDATE sede SET ciudad = $1, estado = $2, paisid = $3 WHERE id = $4 RETURNING *;',
      [city, state, countryId, id],
    );

    return CampusUpdateResult.rows[0];
  }

  async delete(id: number): Promise<Campus> {
    const {rows} = await this.pgClient.query(
      'DELETE FROM sede WHERE id = $1 RETURNING *;',
      [id],
    );

    return rows[0];
  }
}
