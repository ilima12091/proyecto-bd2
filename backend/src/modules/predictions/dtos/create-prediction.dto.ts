import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePredictionDto {
  @IsNumber()
  @IsNotEmpty()
  homeGoals: number;

  @IsNumber()
  @IsNotEmpty()
  awayGoals: number;

  @IsNumber()
  @IsNotEmpty()
  matchId: number;
}
