import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Student } from '../types/student.type';

@Injectable()
export class StudentsModel {
  constructor(@Inject('PG_CONNECTION') private readonly pgClient: PoolClient) {}

  async getAll(): Promise<Student[]> {
    const { rows } = await this.pgClient.query(
      'SELECT * FROM alumno INNER JOIN usuario ON alumno.usuarioid = usuario.id;',
    );
    return rows;
  }

  async create(
    name: string,
    surname: string,
    email: string,
    password: string,
  ): Promise<Student> {
    const userInsertResult = await this.pgClient.query(
      'INSERT INTO usuario (fechacreacion, nombre, apellido, email, contraseña) VALUES (CURRENT_TIMESTAMP, $1, $2, $3, $4) RETURNING *;',
      [name, surname, email, password],
    );
    const userData = userInsertResult.rows[0];

    const studentInsertResult = await this.pgClient.query(
      'INSERT INTO alumno (usuarioid) VALUES ($1) RETURNING *;',
      [userData?.id],
    );
    const studentData = studentInsertResult.rows[0];

    return {
      ...userData,
      id: studentData?.id,
    };
  }

  async delete(id: number): Promise<Student> {
    const userData = await this.pgClient.query(
      'SELECT * FROM usuario INNER JOIN alumno ON usuario.id = alumno.usuarioid WHERE alumno.id = $1;',
      [id],
    );

    const studentData = await this.pgClient.query(
      'DELETE FROM alumno WHERE id = $1 RETURNING *;',
      [id],
    );

    await this.pgClient.query(
      'DELETE FROM usuario WHERE id = $1 RETURNING *;',
      [userData.rows[0]?.usuarioid],
    );

    return studentData.rows[0];
  }
}
