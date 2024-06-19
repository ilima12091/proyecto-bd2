import { Injectable } from '@nestjs/common';
import { PredictionModel } from '../../models/prediction.model';

@Injectable()
export class PredictionsService {
  constructor(private predictionModel: PredictionModel) {}

  async getPredictionsByUserId(userId: number) {
    return await this.predictionModel.getPredictionsByUserId(userId);
  }
}
