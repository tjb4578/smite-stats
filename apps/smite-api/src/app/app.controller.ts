import { Controller, Get, Query } from '@nestjs/common';
import { SmiteApiService } from './app.service';

@Controller()
export class SmiteApiController {
  constructor(private readonly smiteApiService: SmiteApiService) {}

  @Get('gods')
  getGods(@Query('languageCode') lang: string) {
    console.log('[SmiteApiController] Received request for getGods with lang: ' + lang);
    return this.smiteApiService.getGods(lang);
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
}
