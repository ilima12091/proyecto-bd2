import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from '../../dtos/create-country.dto';
import { MatchModel } from '../../models/match.model';

@Injectable()
export class MatchService {
  constructor(private matchModel: MatchModel) {}

}
