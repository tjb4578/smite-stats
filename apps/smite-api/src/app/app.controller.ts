import { Controller, Get, Query } from '@nestjs/common';
import { SmiteApiService } from './app.service';

@Controller()
export class SmiteApiController {
  constructor(private readonly smiteApiService: SmiteApiService) {}

  @Get('gods')
  getAllGods(@Query('languageCode') lang: string) {
    console.log('[SmiteApiController] Received request for getGods with lang: ' + lang);
    return this.smiteApiService.getGods(lang);
  }

  @Get('matches')
  getAllMatches() {
    return this.smiteApiService.getMatches();
  }

  @Get('matchIds')
  getMatchIds() {
    return this.smiteApiService.getMatchId();
  }

  @Get()
  ping() {
    console.log('[SmiteApiController] Ping!')
    return this.smiteApiService.ping();
  }
  
  @Get('test')
  testSession() {
    console.log('[SmiteApiController] Test session')
    return this.smiteApiService.testSession();
  }

  @Get('dataUsage')
  getDataUsed() {
    console.log('[SmiteApiController] Data Usage');
    return this.smiteApiService.dataUsed();
  }
}
