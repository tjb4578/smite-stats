import { Module, HttpModule } from '@nestjs/common';
import { SmiteService } from '../auth/smite.service';

import { SmiteApiController } from './app.controller';
import { SmiteApiService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [SmiteApiController],
  providers: [SmiteApiService, SmiteService],
})
export class AppModule {}
