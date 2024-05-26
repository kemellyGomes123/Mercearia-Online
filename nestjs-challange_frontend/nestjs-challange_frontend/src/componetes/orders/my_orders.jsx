import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './MyOrders.css'
import { useDispatch, useSelector } from 'react-redux';
import {updateCar, addCar, removeCar,clearCart} from "../../store/carSlice"



const MyOrders=()=>{
    const navigate = useNavigate()
    let car =[]
    const [nome,setNome] = useState('')
    const [searchNome,setSearchNome] = useState('')

    const dispatch = useDispatch();

    const carList = useSelector(state => state.car.list);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [hasnextpage, setHasNextPageSize] = useState(true);
   

    const search_name_change_handler =(event)=>{ setSearchNome(event.target.value)}


    const accessToken = localStorage.getItem('accessToken');


    //todo para a busca de itens 

    const searchSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            name: searchNome, 
            page: page,
            pageSize: pageSize,
        };
    
        const config = {
            params: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
    
        try {
            const request = await axios.get('http://localhost:3000/agents/items', config);
            renderTable(request.data, document.getElementById('tabelaItens'))

        } catch (error) {
            console.log(error);
        }
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
            const response = await axios.get('http://localhost:3000/agents/items', config);
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
        const headers = ['id', 'Nome','Quantidade', 'Valor','Acções'];
    
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
            const addButton = document.createElement('button');
                    addButton.textContent = 'Adicionar';
                    addButton.addEventListener('click', (event) => {
                        const clickedButton = event.target;
                        const selectedItem = item;
                        addItem(selectedItem);
                    });

            const addRemoveButton = document.createElement('button');
                addRemoveButton .textContent = 'Remover';
                addRemoveButton .addEventListener('click', (event) => {
                    const clickedButton = event.target;
                    const selectedItem = item;
                    RemoveItem(selectedItem);
                });

            row.appendChild(addButton);
            row.appendChild(addRemoveButton);
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


    useEffect(() => {
        createList();
    }, []); 

    const orderSubmit = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const response = await axios.post('http://localhost:3000/costumers/order',{item:carList},config);
            alert(response.data.msg)
            if(response.data.msg === "Failed to create order"){}else{dispatch(clearCart())}
            
        
        } catch (error) {
            alert("Ocorreu um erro")
            console.error('Ocorreu um erro:', error);
        }
        
      };

    const createList=()=>{
        const List =document.getElementById('MyOrders-car');
        const list = document.createElement('ul');
        list.id = 'car'; 
        List.appendChild(list)
    }

    function addItem(item) {
        let found = false;
        console.log(carList.length);
        
        for (let i = 0; i < carList.length; i++) {
            if (carList[i].id === item.id) {
                const updatedItem = {
                    ...item,
                    quantety: carList[i].quantety + 1
                };
                dispatch(updateCar(updatedItem)); 
                found = true;
                break;
            }
        }
        if (!found) {
            const updatedItem = {
                ...item,
                quantety: 1
            };
            dispatch(addCar(updatedItem));
        }
    }
    
    

    function RemoveItem(itemToRemove) {
        for (let i = 0; i < carList.length; i++) {
            if (carList[i].id === itemToRemove.id) {
                console.log(carList[i]);
                if(carList[i].quantety ==1){
                    dispatch(removeCar(carList[i]))
                    break
                }
                const updatedItem = {
                    ...itemToRemove,
                    quantety: carList[i].quantety - 1 
                };
                dispatch(updateCar(updatedItem)); 
                break;
            }
        }
        
    }

      
    return(
        <>
        <h1>NEW ORDER</h1>
        <div className="MyOrders">
            <div className="searchMotor">
                <div className="MyOrders-search">
                        <h1 className="card-header">Search item</h1>
                        <form className="add_item search" onSubmit={searchSubmitHandler}> 
                            <div className="card-content search">
                                <label>Nome</label>
                                <input type="text" value={searchNome} onChange={search_name_change_handler}></input>
                            </div>

                            <div className="card-footer">
                                <button type="submit" >Search</button>
                            </div>
                        </form>
                </div>
                <div className="MyOrders-table">
                    <div id="tabelaItens"></div>
                    <div>
                        <button onClick={handlePreviousPage} disabled={page === 1}>Página Anterior</button>
                        <button onClick={handleNextPage} disabled={hasnextpage}>Próxima Página</button>
                    </div>
                </div>
            </div>
            <div id="MyOrders-car" className="MyOrders-car">
                <h1>carrinho</h1>
                <button onClick={orderSubmit} >New Order</button>
                <ul>
                    {carList.map((car, index) => (
                    <li key={index} className="carrinhoCompra">
                        ID: {car.id}, Nome: {car.name}, Quantidade: {car.quantety}, Valor: {car.value}
                    </li>
                ))}
                </ul>
                
            </div>

        </div>
        </>
    )}
export default MyOrders