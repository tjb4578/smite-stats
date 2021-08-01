import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SmiteService } from '../auth/smite.service';
import { GodsModule } from '../gods/gods.module';

import { SmiteApiController } from './app.controller';
import { SmiteApiService } from './app.service';

@Module({
  imports: [HttpModule, GodsModule, MongooseModule.forRoot('mongodb://localhost/smitestats')],
  controllers: [SmiteApiController],
  providers: [SmiteApiService, SmiteService],
})
export class AppModule {}
