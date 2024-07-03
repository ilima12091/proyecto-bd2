import { Test, TestingModule } from '@nestjs/testing';
import { StadiumsController } from './stadiums.controller';

describe('StadiumsController', () => {
  let controller: StadiumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StadiumsController],
    }).compile();

    controller = module.get<StadiumsController>(StadiumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
