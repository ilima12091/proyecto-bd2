import { Controller, Get } from '@nestjs/common';
import { TeamsService } from '../../services/teams/teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  async getAll() {
    return await this.teamsService.getAll();
  }
}
