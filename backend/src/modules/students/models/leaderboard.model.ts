import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { StudentLeaderboard } from '../types/student.type';

@Injectable()
export class LeaderboardModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getStudentsPoints(): Promise<StudentLeaderboard[]> {
    const { rows } = await this.pgClient.query(
      'SELECT usuario.nombre as name, usuario.apellido as surname, SUM(predice.puntosobtenidos) AS "totalPoints" ' +
        'FROM predice ' +
        'JOIN usuario ON predice.idalumno = usuario.id ' +
        'GROUP BY predice.idalumno, usuario.nombre, usuario.apellido ' +
        'ORDER BY "totalPoints" desc;',
    );
    return rows;
  }
}
