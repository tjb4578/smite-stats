import { HttpModule, Module } from '@nestjs/common';
import { SmiteApiController } from './smite-api.controller';
import { SmiteApiService } from './smite-api.service';

@Module({
  imports: [HttpModule],
  controllers: [SmiteApiController],
  providers: [SmiteApiService],
})
export class SmiteApiModule {}
