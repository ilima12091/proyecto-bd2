import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from '../../services/students/students.service';
import { CreateStudentDTO } from '../../dtos/create-student.dto';

@Controller('students')
export class StudentsController {
    constructor(private adminService: StudentsService) {}

    @Get()
    async getAll() {
    return await this.adminService.getAll();
    }

    @Post()
    async create(@Body() createAdminDto: CreateStudentDTO) {
    return await this.adminService.create(createAdminDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
    return await this.adminService.delete(id);
    }
}
