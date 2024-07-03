import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

@Injectable()
export class TeamModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll() {
    const { rows } = await this.pgClient.query(
      'SELECT e.id, e.nombre as name, e.urlLogo FROM equipo as e;',
    );
    return rows;
  }
}
