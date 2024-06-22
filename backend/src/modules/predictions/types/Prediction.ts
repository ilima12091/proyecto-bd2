export type Prediction = {
  id: number;
  homePrediction: number;
  awayPrediction: number;
  date: string;
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
  stage: string;
  matchId: number;
  homeFlag?: string;
  awayFlag?: string;
};
