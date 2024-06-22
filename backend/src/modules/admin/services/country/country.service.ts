import { Injectable } from '@nestjs/common';
import { CountryModel } from '../../models/country.model';
import { CreateCountryDto } from '../../dtos/create-country.dto';

@Injectable()
export class CountryService {
  constructor(private countryModel: CountryModel) {}

  async getAll() {
    return await this.countryModel.getAll();
  }

  async getById(id: number) {
    return await this.countryModel.getById(id);
  }

  async create(createAdminDto: CreateCountryDto) {
    const { name, confederation } = createAdminDto;

    const insertData = await this.countryModel.create(
      name,
      confederation
    );

    return insertData;
  }

  async update(id: number, createAdminDto: CreateCountryDto) {
    const { name, confederation } = createAdminDto;

    const updateData = await this.countryModel.update(
      id,
      name,
      confederation
    );

    return updateData;
  }

  async delete(id: number) {
    return await this.countryModel.delete(id);
  }
}
