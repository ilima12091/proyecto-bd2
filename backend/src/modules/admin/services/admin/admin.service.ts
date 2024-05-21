import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

@Injectable()
export class AdminService {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll() {
    const { rows } = await this.pgClient.query('SELECT * FROM administrador');
    return rows;
  }
}
