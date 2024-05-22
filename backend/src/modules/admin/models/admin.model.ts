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
    name: string,
    surname: string,
    email: string,
    password: string,
  ): Promise<Admin> {
    const userInsertResult = await this.pgClient.query(
      'INSERT INTO usuario (fechacreacion, nombre, apellido, email, contraseña) VALUES (CURRENT_TIMESTAMP, $1, $2, $3, $4) RETURNING *;',
      [name, surname, email, password],
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

  async delete(id: number): Promise<Admin> {
    const userData = await this.pgClient.query(
      'SELECT * FROM usuario INNER JOIN administrador ON usuario.id = administrador.usuarioid WHERE administrador.id = $1;',
      [id],
    );

    const adminData = await this.pgClient.query(
      'DELETE FROM administrador WHERE id = $1 RETURNING *;',
      [id],
    );

    await this.pgClient.query(
      'DELETE FROM usuario WHERE id = $1 RETURNING *;',
      [userData.rows[0]?.usuarioid],
    );

    return adminData.rows[0];
  }
}
