import { Controller, Get, Query } from '@nestjs/common';
import { SmiteApiService } from './smite-api.service';

@Controller('api')
export class SmiteApiController {
  constructor(private readonly smiteApiService: SmiteApiService) {}

  @Get('/gods')
  getGods(@Query('languageCode') lang: string) {
    return this.smiteApiService.getGods(lang);
  }
}
