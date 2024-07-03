import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LeaderboardModel } from './models/leaderboard.model';
import { LeaderboardController } from './controllers/leaderboard/leaderboard.controller';
import { LeaderboardService } from './services/leaderboard/leaderboard.service';
import { StudentsController } from './controllers/students/students.controller';
import { StudentsService } from './services/students/students.service';
import { StudentsModel } from './models/students.model';

@Module({
  imports: [DatabaseModule],
  controllers: [
    LeaderboardController,
    StudentsController,
  ],
  providers: [
    LeaderboardService, LeaderboardModel,
    StudentsService, StudentsModel
  ],
})
export class StudentsModule {}
