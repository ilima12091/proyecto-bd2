import { Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AdminService } from '../../services/admin/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async getAll() {
    return await this.adminService.getAll();
  }

  @Post()
  async create(@Req() req: FastifyRequest) {
    console.log('body: ', req.body);
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
