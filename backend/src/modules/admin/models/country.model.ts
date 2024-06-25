import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Country } from '../types/country.type';

@Injectable()
export class CountryModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll(): Promise<Country[]> {
    const { rows } = await this.pgClient.query(
      'SELECT * FROM pais;',
    );
    return rows;
  }

  async getById(id: number): Promise<Country> {
    const { rows } = await this.pgClient.query(
      'SELECT * FROM pais WHERE id = $1;',
      [id]
    );
    console.log(rows);
    return rows[0];
  }

  async create(
    name: string,
    confederation: string
  ): Promise<Country> {
    const countryInsertResult = await this.pgClient.query(
      'INSERT INTO pais (nombre, confederacion) VALUES($1, $2) RETURNING *;',
      [name, confederation],
    );
    const userData = countryInsertResult.rows[0];

    return {
      ...userData,
      id: userData?.id,
    };
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

  async delete(id: number): Promise<Country> {
    const {rows} = await this.pgClient.query(
      'DELETE FROM pais WHERE id = $1 RETURNING *;',
      [id],
    );

    return rows[0];
  }
}
