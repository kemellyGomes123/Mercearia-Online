import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {updateCar} from "../../store/carSlice"
import axios from "axios";
import '../item/add_item.css'
import './MyOrders.css'
const Orders =() =>{

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const accessToken = localStorage.getItem('accessToken');
    const [hasnextpage, setHasNextPageSize] = useState(true);
    

    async function fetchItems() {

        const params = {
            page: page,
            pageSize: pageSize,
        };
        const config = {
            params,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        try {
            const response = await axios.get('http://localhost:3000/agents/orders', config);
            response.data.forEach(async order => {
                delete order.createdAt
                delete order.item
                delete order.updatedAt
            });
            

            const orders = response.data; 
            for (const order of orders) {
                const params = {
                    id:order.user_id,
                    page: page,
                    pageSize: pageSize,
                };
                const config = {
                    params,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                };
                try {
                    const userResponse = await axios.get('http://localhost:3000/agents/costumer', config);
                    const user = userResponse.data.first_name+ ' '+userResponse.data.last_name;
                    order.userName=user
                } catch (error) {
                    console.error(`Falha ao obter o nome do usuário para a ordem com ID ${order.id}: ${error.message}`);
                }
            }


            if(response.data.length >= pageSize){
                setHasNextPageSize(false)
            }else{
                setHasNextPageSize(true)
            }
            const items = response.data;
            renderTable(items, document.getElementById('tabelaItens'));
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    }
    
    function renderTable(items, container) {
        container.innerHTML = "";
    
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        const headers = ['Id do pedido','Valor total do pedido', 'local entrega','ID Usuario','Nome'];
    
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        items.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
    
        table.appendChild(tbody);
        container.appendChild(table);
    }
    
    useEffect(() => {
        fetchItems();
    }, [[page, pageSize]]); 

    const handleNextPage = () => {
        setPage(page + 1);
      };
    
      const handlePreviousPage = () => {
        setPage(page - 1);
      };

    return(
        <div>
             <h1>All Orders</h1>
            <div id="tabelaItens"></div>
            <div>
                <button onClick={handlePreviousPage} disabled={page === 1}>Página Anterior</button>
                <button onClick={handleNextPage} disabled={hasnextpage}>Próxima Página</button>
            </div>
        </div>
       
    )
}

export default Orders