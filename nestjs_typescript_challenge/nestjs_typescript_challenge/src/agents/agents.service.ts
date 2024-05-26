import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto';
import { SearchDto } from './dto/search.dto';
@Injectable()
export class AgentsService {
    constructor(private prisma:PrismaService,private jwt:JwtService, private config:ConfigService){}
    async get_orders(user_role: string, page: number, pageSize: number){
        try{
            console.log(user_role)
            if(user_role !='AGENT'){
                return {msg: "NOT PERMITED"}
            }
            const skipAmount = (page - 1) * pageSize; 
            const orders = this.prisma.orders.findMany(
                {
                    skip: skipAmount,
                    take: parseInt(pageSize.toString()),
                }
            )
            return orders
        }catch(error){throw new Error("Failed to find costumer orders");}
    }

    async get_orders_id(user_id: number, page: number, pageSize: number){
        try{
            console.log(user_id)
            const skipAmount = (page - 1) * pageSize; 
            const orders = this.prisma.orders.findMany(
                {   where:{
                    user_id: user_id
                    },
                    skip: skipAmount,
                    take: parseInt(pageSize.toString()),
                }
            )
            console.log(orders)
            return orders
        }catch(error){throw new Error("Failed to find costumer orders");}
    }

    async get_user_byId(user_role: string, userId:any){
        console.log(userId)
        try{
            const user = this.prisma.user.findFirst({
            where:{
                id: parseInt(userId)
            }})
        console.log(user)
        console.log('funcionou')
        return user
        }catch(error){throw new Error("Failed to find costumer ");}
        
    }

    async get_items(user_role: string, page: number, pageSize: number, name?:string){
        try{
            const where:any = {}
            const skipAmount = (page - 1) * pageSize; 
            if(name){
                where['name'] = {
                    contains: name
                }
            }
            const items = this.prisma.item.findMany({
                where,
                skip: skipAmount,
                take: parseInt(pageSize.toString()),
            })
            return items
        }catch(error){throw new Error("Failed to find costumer orders");}
    }

    async item_update(itemId:number, updatedItemInfo:ItemDto){
        try {
            console.log(updatedItemInfo)
            const updatedItem = await this.prisma.item.update({
                where: { id: itemId }, // Especifica o ID do item que você deseja atualizar
                data: {
                    name: updatedItemInfo.nome,
                    quantety: updatedItemInfo.quantety,
                    value: updatedItemInfo.value,
                }
            });
            return { msg: "Item updated successfully", item: updatedItem };
        } catch (error) {
            console.log(error);
            return { msg: "Error updating item" }; // Retorna uma mensagem de erro se ocorrer um erro durante a atualização
        }

    }


    async new_order(){
        return{msg: "agent orders list"}
    }

    async add_item(Item_Info:ItemDto){
        try{
            const new_item = await this.prisma.item.create({
                data:{
                    name: Item_Info.nome,
                    quantety: Item_Info.quantety,
                    value: Item_Info.value,
                }
            })
            return({msg:"Item added sucessfully", item: new_item})
        }catch(error){
            console.log(error)
        } 
    }

}
