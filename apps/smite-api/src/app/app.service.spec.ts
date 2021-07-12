import { Test } from '@nestjs/testing';
import { SmiteService } from '../auth/smite.service';

import { SmiteApiService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('SmiteApiService', () => {
  let service: SmiteApiService;
  let httpService: HttpService;
  let smiteService: SmiteService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        SmiteApiService,
        SmiteService
      ],
    }).compile();

    service = app.get<SmiteApiService>(SmiteApiService);
    httpService = app.get<HttpService>(HttpService);
    smiteService = app.get<SmiteService>(SmiteService);
  });

  describe('when getGods is called', () => {
    it('should return god data on successful request', (done) => {
      const response = {data: [{god: 'Anhur'}]} as AxiosResponse;
      jest.spyOn(httpService, 'get').mockReturnValue(of(response));
      jest.spyOn(smiteService, 'buildUrl').mockReturnValue(of('url'));
      service.getGods('1').subscribe(
        res => {
          expect(res).toEqual(response.data);
          done();
        }
      );
    });
  });

  describe('when getGods is called', () => {
    it('should return god data on successful request', (done) => {
      const response = {data: 'Success'} as AxiosResponse;
      jest.spyOn(httpService, 'get').mockReturnValue(of(response));
      jest.spyOn(smiteService, 'buildUrl').mockReturnValue(of('url'));
      service.testSession().subscribe(
        res => {
          expect(res).toEqual(response.data);
          done();
        }
      );
    });
  });
});
