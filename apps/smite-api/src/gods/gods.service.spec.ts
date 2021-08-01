// import { Test } from '@nestjs/testing';
// import { SmiteService } from '../auth/smite.service';

// import { GodsService } from './gods.service';
// import { HttpModule, HttpService } from '@nestjs/common';
// import { of } from 'rxjs';
// import { AxiosResponse } from 'axios';
// import { InjectModel, MongooseModule } from '@nestjs/mongoose';

// describe('GodsService', () => {
//   let service: GodsService;
//   let httpService: HttpService;
//   let smiteService: SmiteService;

//   beforeAll(async () => {
//     const app = await Test.createTestingModule({
//       imports: [HttpModule, MongooseModule],
//       providers: [
//         GodsService,
//         SmiteService,
        
//       ],
//     }).compile();

//     service = app.get<GodsService>(GodsService);
//     httpService = app.get<HttpService>(HttpService);
//     smiteService = app.get<SmiteService>(SmiteService);
//   });

//   describe('when getGods is called', () => {
//     it('should return god data on successful request', (done) => {
//       const response = {data: [{god: 'Anhur'}]} as AxiosResponse;
//       jest.spyOn(httpService, 'get').mockReturnValue(of(response));
//       jest.spyOn(smiteService, 'buildUrl').mockReturnValue(of('url'));
//       service.getGods().then(
//         res => {
//           expect(res).toEqual(response.data);
//           done();
//         }
//       );
//     });
//   });
// });
