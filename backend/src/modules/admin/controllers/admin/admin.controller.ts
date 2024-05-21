import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { AdminService } from '../../services/admin/admin.service';
import { CreateAdminDto } from '../../dtos/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async getAll() {
    return await this.adminService.getAll();
  }

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    console.log('body: ', createAdminDto);
    return {
      id: 1,
      name: 'Admin',
      email: '',
    };
  }

  @Delete('/:id')
  async delete() {
    return {
      id: 1,
      name: 'Admin',
      email: '',
    };
  }
}
