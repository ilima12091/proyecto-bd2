import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdminService } from '../../services/admin/admin.service';
import { CreateAdminDto } from '../../dtos/create-admin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async getAll() {
    return await this.adminService.getAll();
  }

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.create(createAdminDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.adminService.delete(id);
  }
}
