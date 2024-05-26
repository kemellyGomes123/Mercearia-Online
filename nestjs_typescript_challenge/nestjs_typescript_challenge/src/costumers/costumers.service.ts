import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { JwtGuard } from 'src/guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CostumerDto} from './dto';


@Injectable()
export class CostumersService {
    constructor(private prisma:PrismaService,private jwt:JwtService, private config:ConfigService){}

    async update_balance(user:any, data:number){
        console.log({user})
        console.log(data)
        try {
            await this.prisma.user.update({
              where: {
                id: user.id
              },
              data: {
                saldo: {
                    increment: data['saldo']
                }
              }
            });
            return({msg:"Saldo atualizado com sucesso"})
          } catch (error) {
            throw new Error(`Erro ao atualizar o saldo do usuário: ${error.message}`);
          }
    }

    async get_orders(user:any){
        try{
            const orders_list = await this.prisma.orders.findMany({
                where:{
                    user_id: user.id
                }
            })
            return orders_list
        }catch(error){
            console.log(error)
            throw new Error("Failed to find costumer orders");
        }
       
    }
    async get_user(user:any){
        return 0
       
    }

    async new_order(data: CostumerDto, user:any, ){
        let validated = true
        console.log(user)
        console.log(data)
        try{

            const items = await this.prisma.item.findMany({
                where: {
                    name: {
                        in: data.item.map((item: any) => item.name)
                    }
                }
            });

            console.log({items});
            const foundItems = items.map(item => item.name);
            const missingItems = data.item.map((item: any) => item.Nome).filter(name => !foundItems.includes(name));
            
            if (missingItems.length > 0) {
                console.warn(`Os seguintes itens não foram encontrados na base de dados: ${missingItems.join(', ')}`);
            }

            for (let i = 0; i < data.item.length; i++) {
                const orderItem = data.item[i];
                const item = await this.prisma.item.findMany({ where: { name: orderItem['name'] } });
                if (!item) {
                    console.warn(`Item ${orderItem['name']} não encontrado no estoque.`);
                    validated = false
                    continue;
                }else if (item[0].quantety < orderItem['quantety']) {
                    console.warn(`Quantidade insuficiente no estoque para o item ${orderItem['name']}.`);
                    validated = false
                    continue;
                }}

            if(validated){    
            //* Cálculo para o custo total do pedido
                const quantidades = data.item.map((item: any) => item.quantety);
                const valor = data.item.map((item: any) => item.value);
                
                const multiplicacoes = quantidades.map((quantidade, index) => quantidade * valor[index]);
                const sum = multiplicacoes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                if(user.saldo < sum){
                    return { msg: "Saldo insuficiente"}
                }else{
                    const valor_total = items.reduce((total, item, index) => total + (item.value * quantidades[index]), 0);

                    const new_order = await this.prisma.orders.create(
                        {
                            data: {
                                user: {connect:  {id: user.id}},
                                valor_total: sum,
                                item: "",
                                order_items : { connect: items.map(item => ({id:item.id}))},
                                local:user.address
                            },
                            include: {
                            order_items: true 
                            }
                        }
                    )

                    await this.prisma.user.update({
                        where: { id: user.id },
                                data: {
                                    saldo: {
                                        decrement: sum
                                    }
                                }
                    })

                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        const orderItem = data.item.find((orderItem: any) => orderItem.name === item.name);
                        console.log("======================")
                        console.log(typeof(orderItem))
                        console.log(orderItem['quantety'])
                        
                        if (orderItem) {
                            await this.prisma.item.update({
                                where: { id: item.id },
                                data: {
                                    quantety: {
                                        decrement: orderItem['quantety'] 
                                    }
                                }
                            });
                        }
                    }
                
                    return { msg: "Costumer order created", order: new_order }
            }
        }else{return { msg: "Failed to create order"}}
        
        }catch(error){
            console.log(error)
            throw new Error("Failed to create costumer order");
        }
    }

}
