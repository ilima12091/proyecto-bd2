import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MatchesController } from './controllers/matches/matches.controller';
import { MatchesService } from './services/matches/matches.service';
import { MatchesRepository } from './repository/matches.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [
        MatchesController
    ],
    providers: [
        MatchesService, MatchesRepository
    ],
    }
)

export class MatchesModule {}
