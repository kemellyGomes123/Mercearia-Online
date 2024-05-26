
import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import UpdateItem from "./updateitem";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from "../../store/itemSlice";
import Modal from 'react-modal';
import'../login/login.css'
import './add_item.css'


const AddItem =()  =>{
    const navigate = useNavigate()
    const [nome,setNome] = useState('')
    const [quantety,setQuantety] = useState()
    const [value,setValue] = useState()
    const [searchNome,setSearchNome] = useState('')
    
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [hasnextpage, setHasNextPageSize] = useState(true);

    const nome_change_handler =(event)=>{ setNome(event.target.value)}
    const quantety_change_handler =(event)=>{ setQuantety(event.target.value)}
    const value_change_handler =(event)=>{ setValue(event.target.value)}

    const search_name_change_handler =(event)=>{ setSearchNome(event.target.value)}

    const dispatch = useDispatch();
    const itemsList = useSelector(state => state.item.items);

    const [Role, setRole] = useState(false);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchID();
    }, [Role]);

    async function fetchID() {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            };
            const user_Info = await axios.get('http://localhost:3000/costumers/me', config);
            const role = user_Info.data.role;

            if(role ==="AGENT"){
                setRole(true);
            }
            
        } catch(error) {
            console.log(error);
        }
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const data = {
            nome: nome,
            value: parseInt(value),
            quantety: parseInt(quantety)
        };
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        
        try{
            const request = await axios.post('http://localhost:3000/agents/add_item', data, config)
            window.location.reload();
        }catch(error){
            console.log(error)
        }}

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
    

    //todo para a tabela

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
        const headers = ['id', 'Nome','Quantidade', 'Valor'];
    
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
            row.addEventListener('click', () => {
                
            openModal(item)
            });

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
    //TODO janela modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    return(
        <div>
            <h1>ITEMS</h1>
            <div>
                <div className="card_add_item">
                    {Role?(<><h1 className="card-header">NEW ITEM</h1>
                    <form onSubmit={handleSubmit} className="add_item"> 
                        <div className="card-content">
                            <label>Nome</label>
                            <input type="text" value={nome} onChange={nome_change_handler}></input>
                        </div>

                        <div className="card-content">
                            <label>Valor</label>
                            <input type="number" value={value} onChange={value_change_handler}></input>
                        </div>

                        <div className="card-content">
                            <label>Quantidade</label>
                            <input type="number" value={quantety} onChange={quantety_change_handler}></input>
                        </div>

                        <div className="card-footer">
                            <button  type="submit">Add</button>
                        </div>
                    </form>
                    </>):(<></>)}

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
            </div>
            <div id="tabelaItens"></div>
            <div>
                <button onClick={handlePreviousPage} disabled={page === 1}>Página Anterior</button>
                <button onClick={handleNextPage} disabled={hasnextpage}>Próxima Página</button>
            </div>
            <div>
            
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Update Item Modal"
                style={{
                    content: {
                        
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '10px',
                        padding:'20px',
                    }
                }}
            >
                {selectedItem && (
                    <UpdateItem
                    className = "modal-content"
                        agentId={selectedItem.id}
                        item_name={selectedItem.name}
                        item_value={selectedItem.value}
                        item_quantety={selectedItem.quantety}
                        onClose={closeModal} 
                    />
                )}
            </Modal>
        </div>
        </div>
    )
}

export default AddItem