import { Controller, Get, Param } from '@nestjs/common';
import { PredictionsService } from '../../services/predictions/predictions.service';

@Controller('users/:id/predictions')
export class PredictionsController {
  constructor(private predictionsService: PredictionsService) {}

  @Get()
  async getPredictions(@Param('id') userId: number) {
    return await this.predictionsService.getPredictionsByUserId(userId);
  }
}
