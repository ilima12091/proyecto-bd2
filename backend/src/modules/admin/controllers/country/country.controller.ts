import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CountryService } from '../../services/country/country.service';
import { CreateCountryDto } from '../../dtos/create-country.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  async getAll() {
    return await this.countryService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.countryService.getById(id);
  }

  @Post()
  async create(@Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.create(createCountryDto);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.update(id, createCountryDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.countryService.delete(id);
  }
}
