import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from '../../services/students/students.service';
import { CreateStudentDTO } from '../../dtos/create-student.dto';

@Controller('students')
export class StudentsController {
    constructor(private studentService: StudentsService) {}

    @Get()
    async getAll() {
    return await this.studentService.getAll();
    }

    @Post()
    async create(@Body() createStudentDto: CreateStudentDTO) {
    return await this.studentService.create(createStudentDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
    return await this.studentService.delete(id);
    }
}
