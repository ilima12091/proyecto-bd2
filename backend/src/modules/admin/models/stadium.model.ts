import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

@Injectable()
export class StadiumModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll() {
    const { rows } = await this.pgClient.query(
      'SELECT e.id, e.nombre as name FROM estadio as e',
    );
    return rows;
  }
}
