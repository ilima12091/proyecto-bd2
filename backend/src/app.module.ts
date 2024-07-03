import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './modules/database/database.module';

import { PredictionsModule } from './modules/predictions/predictions.module';
<<<<<<< HEAD
import { MatchesModule } from './modules/matches/matches.module';
=======
import { StudentsModule } from './modules/students/students.module';

>>>>>>> 717cf5d (Resuelto conflicto con origin 15 registro)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    DatabaseModule,
    PredictionsModule,
<<<<<<< HEAD
    MatchesModule,
=======
    StudentsModule
>>>>>>> 717cf5d (Resuelto conflicto con origin 15 registro)
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
