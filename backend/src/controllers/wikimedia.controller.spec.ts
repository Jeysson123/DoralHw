import { Test, TestingModule } from '@nestjs/testing';
import { WikimediaController } from './wikimedia.controller';

describe('WikimediaController', () => {
  let controller: WikimediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WikimediaController],
    }).compile();

    controller = module.get<WikimediaController>(WikimediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
