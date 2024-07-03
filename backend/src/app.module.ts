import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './modules/database/database.module';
import { StudentsModule } from './modules/students/students.module';
import { PredictionsModule } from './modules/predictions/predictions.module';
import { MatchesModule } from './modules/matches/matches.module';
import { TeamsModule } from './modules/teams/teams.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    DatabaseModule,
    StudentsModule,
    PredictionsModule,
    MatchesModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
