import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../../dtos/create-admin.dto';
import { AdminModel } from '../../models/admin.model';

@Injectable()
export class AdminService {
  constructor(private adminModel: AdminModel) {}

  async getAll() {
    return await this.adminModel.getAll();
  }

  async create(createAdminDto: CreateAdminDto) {
    const { name, surname, password, email } = createAdminDto;

    const insertData = await this.adminModel.create(
      name,
      surname,
      email,
      password,
    );

    return insertData;
  }

  async delete(id: number) {
    return await this.adminModel.delete(id);
  }
}
