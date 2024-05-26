import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { JwtGuard } from 'src/guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { ItemDto } from './dto';
import { SearchDto } from './dto/search.dto';

@UseGuards(JwtGuard)
@Controller('agents')
export class AgentsController {
    constructor(private agentService: AgentsService){}

    @Get('orders')
    get_orders(@GetUser() user:User,  
    @Query('page') page: number, 
    @Query('pageSize') pageSize: number){
        return this.agentService.get_orders(user.role, page, pageSize)
    }
    
    @Get('orders_id')
    get_orders_id(@GetUser() user:User,  
    @Query('page') page: number, 
    @Query('pageSize') pageSize: number){
        console.log(user, page ,pageSize)
        return this.agentService.get_orders_id(user.id, page, pageSize)
    }

    @Get('costumer')
    get_user_byId(@GetUser() user:User, @Query('id') id?:number  ){
        console.log(id)
        return this.agentService.get_user_byId(user.role,id)
    }

    @Get('items')
    get_items(
        @GetUser() user:User, 
        @Query('page') page: number, 
        @Query('pageSize') pageSize: number ,
        @Query('name') name?:string,  
        ){
        return this.agentService.get_items(user.role, page, pageSize,name)
    }
    
    @Patch('update/:id')
    item_update(
        @Body() data:ItemDto,
        @Param('id') id: string, 
    ){
        return this.agentService.item_update(parseInt(id), data)
    }

    @Post('order')
    new_order(){
        return this.agentService.new_order()
    }


    @Post('add_item')
    add_item(@Body() data:any){
        console.log(data)
        return this.agentService.add_item(data)
    }




}
