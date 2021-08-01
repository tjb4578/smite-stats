import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SmiteService } from '../auth/smite.service';
import { GodsController } from './gods.controller';
import { GodsService } from './gods.service';
import { God, GodDocument } from '@smitestats/gods';

describe('GodsController', () => {
  let godsController: GodsController;
  let godsService: GodsService;

  const mockGodsService = jest.mock('./gods.service');

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [GodsController],
      providers: [{provide: GodsService, useValue: mockGodsService }, SmiteService],
    }).compile();

    godsController = app.get<GodsController>(GodsController);
    godsService = app.get<GodsService>(GodsService);
  });

  describe('when hitting the getGods endpoint', () => {
    it('should return god data from service', (done) => {
      const god: God = {
        godId: '1111',
        name: 'Anhur',
        godCard_URL: '',
        godIcon_URL: '',
        title: 'the destroyer',
        type: 'ranged',
        dmgType: 'physical',
        role: 'Hunter',
        latestGod: false
      };

      godsService.getGods = jest.fn().mockReturnValue(Promise.resolve([god as GodDocument]));

      godsController.getAllGods().then(res => {
        expect(res).toEqual([god]);
        done();
      })
    });
  });
});
