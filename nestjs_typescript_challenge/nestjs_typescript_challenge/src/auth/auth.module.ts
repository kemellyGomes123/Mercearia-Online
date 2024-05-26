import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategy";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
    imports:[JwtModule.register({})],
    controllers:[AuthController],
    providers: [AuthService, JwtStrategy]
})

export class AuthModule{

}