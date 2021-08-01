import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SmiteService } from '../auth/smite.service';
import { God, GodSchema } from '@smitestats/gods';

import { GodsController } from './gods.controller';
import { GodsService } from './gods.service';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: God.name, schema: GodSchema}])],
  controllers: [GodsController],
  providers: [GodsService, SmiteService],
})
export class GodsModule {}
