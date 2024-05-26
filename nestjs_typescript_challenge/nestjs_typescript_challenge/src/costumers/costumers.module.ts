import { Module } from '@nestjs/common';
import { CostumersController } from './costumers.controller';
import { CostumersService } from './costumers.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CostumersController],
  providers: [CostumersService, JwtService]
})
export class CostumersModule {}
