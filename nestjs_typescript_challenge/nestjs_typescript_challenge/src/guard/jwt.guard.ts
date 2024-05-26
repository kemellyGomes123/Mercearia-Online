import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from '@nestjs/core';
import { UserRole } from "./user-role.enum";


export class JwtGuard extends AuthGuard('jwt'){
    constructor(){
        super()
    }
    
}