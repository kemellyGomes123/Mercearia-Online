import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class SearchDto{

    @IsString()
    @IsNotEmpty()
    nome: string
}