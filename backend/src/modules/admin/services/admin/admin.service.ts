import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { CreateAdminDto } from '../../dtos/create-admin.dto';
import { AdminModel } from '../../models/admin.model';

@Injectable()
export class AdminService {
  constructor(
    @Inject('PG_CONNECTION') private readonly pgClient: PoolClient,
    private adminModel: AdminModel,
  ) {}

  async getAll() {
    return await this.adminModel.getAll();
  }

  async create(createAdminDto: CreateAdminDto) {
    const { nombre, apellido, email, contraseña } = createAdminDto;

    const insertData = await this.adminModel.create(
      nombre,
      apellido,
      email,
      contraseña,
    );

    return insertData;
  }
}
