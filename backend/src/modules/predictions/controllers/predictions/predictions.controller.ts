import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PredictionsService } from '../../services/predictions/predictions.service';
import { CreatePredictionDto } from '../../dtos/create-prediction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Predictions')
@Controller('predictions')
export class PredictionsController {
  constructor(private predictionsService: PredictionsService) {}

  @Get('users/:id')
  async getPredictions(@Param('id') userId: number) {
    return await this.predictionsService.getPredictionsByUserId(userId);
  }

  @Post('users/:id')
  async createOrUpdatePrediction(
    @Param('id') userId: number,
    @Body() createPredictionDto: CreatePredictionDto,
  ) {
    return await this.predictionsService.createOrUpdatePrediction(
      userId,
      createPredictionDto,
    );
  }

  @Post('points/:matchId')
  async calculatePredictionsPoints(@Param('matchId') matchId: number) {
    return await this.predictionsService.calculatePoints(matchId);
  }

  @Post('users/:id/:championId/:runnerUpId')
  async createChampionAndRunnerUpPrediction(
    @Param('id') userId: number,
    @Param('championId') championId: number,
    @Param('runnerUpId') runnerUpId: number,
  ) {
    return await this.predictionsService.createChampionAndRunnerUpPrediction(
      userId,
      championId,
      runnerUpId,
    );
  }
}
