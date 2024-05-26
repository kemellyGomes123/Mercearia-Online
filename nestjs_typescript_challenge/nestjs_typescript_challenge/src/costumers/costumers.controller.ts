import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CostumersService } from './costumers.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/guard';
import { CostumerDto } from './dto';


@UseGuards(JwtGuard)
@Controller('costumers')
export class CostumersController {
    constructor(private costumerService: CostumersService ){}
    @Get('me')
    get_me(@GetUser() user:User){
        return user
    }
    @Get('name')
    get_user(@GetUser() user:User,@Query('id') id: number ){
        console.log(id)
        return this.costumerService.get_user(user)
    }

    @Get('orders')
    get_orders(@GetUser() user:User ){
        return this.costumerService.get_orders(user)
    }

    @Patch('balance')
    update_balance(@GetUser() user:User, 
        @Body() data: number,
        @Param('id') id: string,  ){
        return this.costumerService.update_balance(user, data)
    }

    @Post('order')
    new_order(@Body() data: CostumerDto, @GetUser() user:User){
        try {
            return this.costumerService.new_order(data, user)
        } catch (error) {
            throw error
        }
        
        
    }
}
