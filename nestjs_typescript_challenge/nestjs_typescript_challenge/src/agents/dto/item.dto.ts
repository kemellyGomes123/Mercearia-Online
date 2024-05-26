import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ItemDto{

    @IsString()
    @IsNotEmpty()
    nome: string

    @IsNumber()
    @IsNotEmpty()
    value: number

    @IsNumber()
    @IsNotEmpty()
    quantety: number
}