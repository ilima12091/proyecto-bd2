import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
  ValidateIf,
} from 'class-validator';

export class CreateMatchDTO {
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  stage: string;

  @IsNumberString()
  @IsNotEmpty()
  stadiumId: number;

  @IsNumberString()
  @IsNotEmpty()
  home: number;

  @IsNumberString()
  @IsNotEmpty()
  away: number;

  @ValidateIf((o) => o.homeGoals !== '')
  @IsOptional()
  @IsNumberString()
  homeGoals: number;

  @ValidateIf((o) => o.awayGoals !== '')
  @IsOptional()
  @IsNumberString()
  awayGoals: number;
}
