import { Injectable } from '@nestjs/common';
import { TeamModel } from '../../models/team.model';

@Injectable()
export class TeamsService {
  constructor(private teamModel: TeamModel) {}

  async getAll() {
    return await this.teamModel.getAll();
  }
}
