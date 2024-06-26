import { Injectable } from '@nestjs/common';
import { PredictionModel } from '../../models/prediction.model';
import { CreatePredictionDto } from '../../dtos/create-prediction.dto';

@Injectable()
export class PredictionsService {
  constructor(private predictionModel: PredictionModel) {}

  async getPredictionsByUserId(userId: number) {
    return await this.predictionModel.getPredictionsByUserId(userId);
  }

  async createOrUpdatePrediction(
    userId: number,
    createPredictionDto: CreatePredictionDto,
  ) {
    const { homeGoals, awayGoals, matchId } = createPredictionDto;

    const predictionId = await this.predictionModel.getPredictionIdByMatchId(
      userId,
      matchId,
    );

    if (predictionId) {
      return await this.predictionModel.updatePrediction(
        predictionId,
        homeGoals,
        awayGoals,
      );
    }

    return await this.predictionModel.createPrediction(
      userId,
      homeGoals,
      awayGoals,
      matchId,
    );
  }

  async createChampionAndRunnerUpPrediction(
    userId: number,
    championId: number,
    runnerUpId: number
  ) {
    return await this.predictionModel.createChampionAndRunnerUpPrediction(
      userId,
      championId,
      runnerUpId
    );
  }
}
