import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LeaderboardService } from '../../services/leaderboard/leaderboard.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get()
  async getStudentsPoints() {
    return await this.leaderboardService.getStudentsPoints();
  }
}
