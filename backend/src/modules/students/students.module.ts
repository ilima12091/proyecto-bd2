import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LeaderboardModel } from './models/leaderboard.model';
import { LeaderboardController } from './controllers/leaderboard/leaderboard.controller';
import { LeaderboardService } from './services/leaderboard/leaderboard.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    LeaderboardController
  ],
  providers: [
    LeaderboardService, LeaderboardModel
  ],
})
export class StudentsModule {}
