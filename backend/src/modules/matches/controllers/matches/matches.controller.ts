import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MatchesService } from '../../services/matches/matches.service';
import { CreateMatchDTO } from '../../dtos/create-match-dto';

@Controller('matches')
export class MatchesController {

    constructor(private readonly matchesService: MatchesService) {}

    @Get()
    async getAll() {
      return await this.matchesService.getAll();
    }
    @Get('/:id')
    async getById(@Param('id') id: number) {
      return await this.matchesService.getById(id);
    }

    @Get('/play')
    async getAllMatchToPlay() {
      return await this.matchesService.getAllMatchToPlay();
    }

    @Post()
    async create(@Body() createMatchDTO: CreateMatchDTO) {
      return await this.matchesService.create(createMatchDTO);
    }
    @Delete('/:id')
    async delete(@Param('id') id: number) {
      return await this.matchesService.delete(id);
    }
    @Post('/:id/result')
    async insertResult(
      @Param('id') id: number,
      @Body('golesLocal') localGoals: number,
      @Body('golesVisitante') awayGoals: number
    ) {
      return await this.matchesService.insertResult(
        id,
        localGoals,
        awayGoals
      );
    }
}
