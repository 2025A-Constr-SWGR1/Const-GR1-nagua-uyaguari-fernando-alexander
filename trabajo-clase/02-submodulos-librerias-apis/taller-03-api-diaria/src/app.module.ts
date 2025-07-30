import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalApiController } from './personal-api.controller';

@Module({
  imports: [],
  controllers: [AppController, PersonalApiController],
  providers: [AppService],
})
export class AppModule {}
