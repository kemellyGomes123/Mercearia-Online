import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CostumerDto{

    @IsString()
    @IsNotEmpty()
    item: string []

    @IsString()
    @IsNotEmpty()
    local: string

    @IsNumber()
    @IsNotEmpty()
    valor: number
}