import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PredictionsService } from '../../services/predictions/predictions.service';
import { CreatePredictionDto } from '../../dtos/create-prediction.dto';

@Controller('users/:id/predictions')
export class PredictionsController {
  constructor(private predictionsService: PredictionsService) {}

  @Get()
  async getPredictions(@Param('id') userId: number) {
    return await this.predictionsService.getPredictionsByUserId(userId);
  }

  @Post()
  async createOrUpdatePrediction(
    @Param('id') userId: number,
    @Body() createPredictionDto: CreatePredictionDto,
  ) {
    return await this.predictionsService.createOrUpdatePrediction(
      userId,
      createPredictionDto,
    );
  }
}
