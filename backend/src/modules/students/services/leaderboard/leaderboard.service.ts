import { Injectable } from '@nestjs/common';
import { LeaderboardModel } from '../../models/leaderboard.model'; 

@Injectable()
export class LeaderboardService {
  constructor(private leaderboardModel: LeaderboardModel) {}

  async getStudentsPoints() {
    return await this.leaderboardModel.getStudentsPoints();
  }
}
