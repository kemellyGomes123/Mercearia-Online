import {IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    lastname: string

    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    role: string
}