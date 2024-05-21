import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Admin } from '../types/admin.type';

@Injectable()
export class AdminModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll(): Promise<Admin[]> {
    const { rows } = await this.pgClient.query(
      'SELECT * FROM administrador INNER JOIN usuario ON administrador.usuarioid = usuario.id;',
    );
    return rows;
  }

  async create(
    nombre: string,
    apellido: string,
    email: string,
    contraseña: string,
  ): Promise<Admin> {
    const userInsertResult = await this.pgClient.query(
      'INSERT INTO usuario (fechacreacion, nombre, apellido, email, contraseña) VALUES (CURRENT_TIMESTAMP, $1, $2, $3, $4) RETURNING *;',
      [nombre, apellido, email, contraseña],
    );
    const userData = userInsertResult.rows[0];

    const adminInsertResult = await this.pgClient.query(
      'INSERT INTO administrador (usuarioid) VALUES ($1) RETURNING *;',
      [userData?.id],
    );
    const adminData = adminInsertResult.rows[0];

    return {
      ...userData,
      id: adminData?.id,
    };
  }
}
