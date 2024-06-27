import { Controller } from "@nestjs/common";
import { MatchService } from "../../services/match/match.service";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Match')
@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {

  }
}
