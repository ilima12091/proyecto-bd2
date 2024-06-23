import { Injectable } from '@nestjs/common';
import { CampusModel } from '../../models/campus.model';
import { CreateCampusDto } from '../../dtos/create-campus.dto';
import { CountryService } from '../country/country.service';

@Injectable()
export class CampusService {
  constructor(private campusModel: CampusModel,
              private countryService: CountryService
  ) {}

  async getAll() {
    return await this.campusModel.getAll();
  }

  async getById(id: number) {
    return await this.campusModel.getById(id);
  }

  async create(createCampusDto: CreateCampusDto) {
    const { city, state, countryId } = createCampusDto;

    const insertData = await this.campusModel.create(
      city,
      state,
      countryId
    );

    return insertData;
  }

  async update(id: number, createCampusDto: CreateCampusDto) {
    if (id !== createCampusDto.id) {
      throw new Error('El id del body y la url no coinciden');
    }

    const { city, state, countryId } = createCampusDto;

    const updateData = await this.campusModel.update(
      id,
      city,
      state,
      countryId
    );

    return updateData;
  }

  async delete(id: number) {
    return await this.campusModel.delete(id);
  }
}
