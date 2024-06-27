import { Injectable } from '@nestjs/common';
import { StudentsModel } from '../../models/students.model';
import { CreateStudentDTO } from '../../dtos/create-student.dto';

@Injectable()
export class StudentsService {
    constructor(private studentModel: StudentsModel) {}

    async getAll() {
      return await this.studentModel.getAll();
    }
  
    async create(createStudentDto: CreateStudentDTO) {
      const { name, surname, password, email } = createStudentDto;
  
      const insertData = await this.studentModel.create(
        name,
        surname,
        email,
        password,
      );
  
      return insertData;
    }
  
    async delete(id: number) {
      return await this.studentModel.delete(id);
    }
  }
