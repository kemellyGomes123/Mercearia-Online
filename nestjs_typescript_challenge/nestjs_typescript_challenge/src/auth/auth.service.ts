import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Roles } from "@prisma/client";

@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService,private jwt:JwtService, private config:ConfigService){}
    async signup(data: AuthDto){
        const hased_password = await argon.hash(data.password)

        try{
            const new_user = await this.prisma.user.create(
                {data:{
                    email: data.email,
                    last_name: data.lastname,
                    first_name: data.firstname,
                    address: data.address,
                    password: hased_password,
                    role: 'COSTUMER'
                }})

            delete new_user.password

            return this.authToken(new_user.id, new_user.email, new_user.role)
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code =='P2002'){
                    throw new ForbiddenException('Credencials taken');
                }
            }
            throw error;
        }
            
        
    }

    async signin(data: AuthDto){

        const user = await this.prisma.user.findUnique({
                where: {
                    email: data.email
                }
                
        })

        if(!user)
            throw new ForbiddenException('Credencials incorrect');
        
        const pwMatches = await argon.verify(
            user.password,
            data.password
        );

        //excepcao casso a palavra passe seja incorreta
        if(!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect');
                
        //reenviar o usuario
        delete user.password;
        return this.authToken(user.id, user.email,user.role);
    }

    async authToken(userID:number, email:string, role:Roles): Promise<{acess_token: string}>{
        const payload = {
            sub:userID,
            email
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload,{
            expiresIn: '60m',
            secret: secret
        })

        return{acess_token: token}
    }
}