import { Test, TestingModule } from '@nestjs/testing';
import { SmiteApiController } from './smite-api.controller';
import { SmiteApiService } from './smite-api.service';

describe('SmiteApiController', () => {
  let smiteApiController: SmiteApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SmiteApiController],
      providers: [SmiteApiService],
    }).compile();

    smiteApiController = app.get<SmiteApiController>(SmiteApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(smiteApiController.getHello()).toBe('Hello World!');
    });
  });
});
