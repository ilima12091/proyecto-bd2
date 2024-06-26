import { Module } from '@nestjs/common';
import { PredictionsController } from './controllers/predictions/predictions.controller';
import { PredictionsService } from './services/predictions/predictions.service';
import { DatabaseModule } from '../database/database.module';
import { PredictionModel } from './models/prediction.model';

@Module({
  imports: [DatabaseModule],
  controllers: [PredictionsController],
  providers: [PredictionsService, PredictionModel],
})
export class PredictionsModule {}
