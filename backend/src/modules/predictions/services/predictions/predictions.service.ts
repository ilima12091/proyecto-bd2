import { Injectable } from '@nestjs/common';
import { PredictionModel } from '../../models/prediction.model';
<<<<<<< HEAD
import { CreatePredictionDto } from '../../dtos/create-prediction.dto';
=======
>>>>>>> 2ce0e06 (Se agrega parte de la pantalla de predicciones y el módulo de predicciones sin terminar en el backend)

@Injectable()
export class PredictionsService {
  constructor(private predictionModel: PredictionModel) {}

  async getPredictionsByUserId(userId: number) {
    return await this.predictionModel.getPredictionsByUserId(userId);
  }
<<<<<<< HEAD

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

  async loadPredictionPoints(
    userId: number,
    userLocalGoals: number,
    userAwayGoals: number
  ) {

  }
=======
>>>>>>> 2ce0e06 (Se agrega parte de la pantalla de predicciones y el módulo de predicciones sin terminar en el backend)
}
