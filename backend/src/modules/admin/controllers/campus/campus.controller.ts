import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CampusService } from '../../services/campus/campus.service';
import { CreateCampusDto } from '../../dtos/create-campus.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Campus')
@Controller('campus')
export class CampusController {
  constructor(private campusService: CampusService) {}

  @Get()
  async getAll() {
    return await this.campusService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.campusService.getById(id);
  }

  @Post()
  async create(@Body() createCampusDto: CreateCampusDto) {
    return await this.campusService.create(createCampusDto);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() createCampusDto: CreateCampusDto) {
    return await this.campusService.update(id, createCampusDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.campusService.delete(id);
  }
}
