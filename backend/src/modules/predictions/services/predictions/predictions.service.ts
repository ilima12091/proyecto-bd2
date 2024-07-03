import { Injectable } from '@nestjs/common';
import { PredictionModel } from '../../models/prediction.model';
import { CreatePredictionDto } from '../../dtos/create-prediction.dto';
import { MatchModel } from 'src/modules/admin/models/match.model';

@Injectable()
export class PredictionsService {
  constructor(
    private predictionModel: PredictionModel,
    private matchModel: MatchModel,
  ) {}

  async getPredictionsByUserId(userId: number) {
    return await this.predictionModel.getPredictionsByUserId(userId);
  }

  async calculatePoints(matchId: number) {
    const predictions =
      await this.predictionModel.getPredictionIdByMatchId(matchId);
    for (const prediction of predictions) {
      await this.predictionModel.updatePredictionPoints(
        matchId,
        prediction.idalumno,
        prediction.goleslocal,
        prediction.golesvisitante,
      );
    }
  }

  async createOrUpdatePrediction(
    userId: number,
    createPredictionDto: CreatePredictionDto,
  ) {
    const { homeGoals, awayGoals, matchId } = createPredictionDto;

    const predictionId =
      await this.predictionModel.getPredictionIdByMatchAndUserId(
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
    runnerUpId: number,
  ) {
    return await this.predictionModel.createChampionAndRunnerUpPrediction(
      userId,
      championId,
      runnerUpId,
    );
  }

  async insertMatchPrediction(
    matchId: number,
    userId: number,
    userLocalGoals: number,
    userAwayGoals: number,
  ) {
    return await this.predictionModel.insertMatchPrediction(
      matchId,
      userId,
      userLocalGoals,
      userAwayGoals,
    );
  }

  async updatePredictionPoints(
    matchId: number,
    userId: number,
    userLocalGoals: number,
    userAwayGoals: number,
  ) {
    return await this.predictionModel.updatePredictionPoints(
      matchId,
      userId,
      userLocalGoals,
      userAwayGoals,
    );
  }
}
