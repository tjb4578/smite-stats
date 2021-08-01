import { Controller, Get } from '@nestjs/common';
import { GodsService } from './gods.service';

@Controller()
export class GodsController {
  constructor(private readonly godsService: GodsService) {}

  @Get('gods')
  getAllGods() {
    console.log('[GodsController] Received request for getGods');
    return this.godsService.getGods();
  }
}
