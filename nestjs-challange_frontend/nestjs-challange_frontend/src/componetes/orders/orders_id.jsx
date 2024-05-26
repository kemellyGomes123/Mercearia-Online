import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './MyOrders.css'


const Orders_Id =()=>{

    const [nome,setNome] = useState('')
    const [user_nome,setUserNome] = useState('')
    
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [hasnextpage, setHasNextPageSize] = useState(true);

    const accessToken = localStorage.getItem('accessToken');
    async function get_me(){
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        const user_Info = await axios.get('http://localhost:3000/costumers/me', config);
        setUserNome(user_Info.data.first_name + ' '+ user_Info.data.last_name)
    }

    async function fetchItems() { 
        const params = {
            name: nome, 
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
            const response = await axios.get('http://localhost:3000/agents/orders_id', config);
            response.data.forEach(order => {
                delete order.createdAt
                delete order.item
                delete order.updatedAt
                delete order.user_id
                order.userName = user_nome
            });
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
        const headers = ['Id', 'Valor total','Local entrega', 'Nome'];
    
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
        get_me()
        fetchItems();
    }, [[page, pageSize]]);

    const handleNextPage = () => {
        setPage(page + 1);
      };
    
      const handlePreviousPage = () => {
        setPage(page - 1);
      };

    return(
        <>
            <h1>MY ORDERS</h1>
            <div id="tabelaItens"></div>
            <div>
                <button onClick={handlePreviousPage} disabled={page === 1}>Página Anterior</button>
                <button onClick={handleNextPage} disabled={hasnextpage}>Próxima Página</button>
            </div>
        </>
        
    )
}
export default Orders_Id