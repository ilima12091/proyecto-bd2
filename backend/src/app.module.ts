import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './modules/database/database.module';
import { StudentsModule } from './modules/students/students.module';
import { PredictionsModule } from './modules/predictions/predictions.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    DatabaseModule,
    StudentsModule,
    PredictionsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
