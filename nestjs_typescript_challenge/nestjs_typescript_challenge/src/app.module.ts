import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AgentsModule } from './agents/agents.module';
import { CostumersModule } from './costumers/costumers.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AgentsModule,
    CostumersModule,
    UserModule,
    OrderModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService,JwtService],
})
export class AppModule {}
