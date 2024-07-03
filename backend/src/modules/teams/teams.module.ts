import { Module } from '@nestjs/common';
import { TeamsController } from './controllers/teams/teams.controller';
import { TeamsService } from './services/teams/teams.service';
import { DatabaseModule } from '../database/database.module';
import { TeamModel } from './models/team.model';

@Module({
  imports: [DatabaseModule],
  controllers: [TeamsController],
  providers: [TeamsService, TeamModel],
})
export class TeamsModule {}
