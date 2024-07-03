import { Controller, Get } from '@nestjs/common';
import { StadiumsService } from '../../services/stadiums/stadiums.service';

@Controller('stadiums')
export class StadiumsController {
  constructor(private stadiumsService: StadiumsService) {}

  @Get()
  async getAll() {
    return await this.stadiumsService.getAll();
  }
}
