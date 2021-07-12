import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SmiteService } from '../auth/smite.service';
import { SmiteApiController } from './app.controller';
import { SmiteApiService } from './app.service';

describe('SmiteApiController', () => {
  let smiteApiController: SmiteApiController;
  let smiteApiService: SmiteApiService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SmiteApiController],
      providers: [SmiteApiService, SmiteService],
    }).compile();

    smiteApiController = app.get<SmiteApiController>(SmiteApiController);
    smiteApiService = app.get<SmiteApiService>(SmiteApiService);
  });

  describe('when hitting the getGods endpoint', () => {
    it('should return god data from service', (done) => {
      jest.spyOn(smiteApiService, 'getGods').mockReturnValue(of([{god: 'Anhur'}]));
      smiteApiController.getGods('1').subscribe(res => {
        expect(res).toEqual([{god: 'Anhur'}]);
        done();
      })
    });
  });

  describe('when hitting the test session endpoint', () => {
    it('should return info about session', (done) => {
      jest.spyOn(smiteApiService, 'testSession').mockReturnValue(of('Success'));
      smiteApiController.testSession().subscribe(res => {
        expect(res).toEqual('Success');
        done();
      })
    });
  });
});
