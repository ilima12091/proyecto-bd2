import { Injectable } from '@nestjs/common';
import { StadiumModel } from '../../models/stadium.model';

@Injectable()
export class StadiumsService {
  constructor(private stadiumModel: StadiumModel) {}

  async getAll() {
    return await this.stadiumModel.getAll();
  }
}
