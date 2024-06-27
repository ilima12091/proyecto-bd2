import { Injectable } from '@nestjs/common';
import { MatchesRepository } from '../../repository/matches.repository';
import { CreateMatchDTO } from '../../dtos/create-match-dto';

@Injectable()
export class MatchesService {
    constructor(private matchesRepository: MatchesRepository) {}

    async getAll() {
      return await this.matchesRepository.getAll();
    }
  
    async create(createMatchDTO: CreateMatchDTO) {
      const insertData = await this.matchesRepository.create(
        createMatchDTO
      );
  
      return insertData;
    }

    async getAllMatchToPlay() {
      return await this.matchesRepository.getAllMatchToPlay();
    }

    async getById(id: number) {
      return await this.matchesRepository.getById(id);
    }

    async insertResult(
      matchId: number,
      localGoals: number,
      awayGoals: number
    ) {
      return await this.matchesRepository.insertResult(
        matchId,
        localGoals,
        awayGoals
      );
    }
  
    async delete(id: number) {
      return await this.matchesRepository.delete(id);
    }
}
