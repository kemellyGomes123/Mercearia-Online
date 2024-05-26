import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AgentsController],
  providers: [AgentsService, JwtService]
})
export class AgentsModule {}
