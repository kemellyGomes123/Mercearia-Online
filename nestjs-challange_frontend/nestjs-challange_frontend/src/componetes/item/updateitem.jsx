import React,{useState,useEffect} from "react";
import axios from "axios";

import './add_item.css'

const UpdateItem = ({ onClose, agentId, item_name,item_value,item_quantety}) => {

    const [nome,setNome] = useState(item_name)
    const [quantety,setQuantety] = useState(item_quantety)
    const [value,setValue] = useState(item_value)
    const nome_change_handler =(event)=>{ setNome(event.target.value)}
    const quantety_change_handler =(event)=>{ setQuantety(event.target.value)}
    const value_change_handler =(event)=>{ setValue(event.target.value)}
    const accessToken = localStorage.getItem('accessToken');

    const [showAlert, setShowAlert] = useState(false);

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
            const id = agentId;
            const update = await axios.patch(`http://localhost:3000/agents/update/${id}`, data, config);
            window.alert("Item atualizado com sucesso")
            
          
        } catch(error) {
            console.log(error);
        }
        onClose(); 
      };

  return (
    <div className="modal-form">
      <h2>Formulário</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value={nome} onChange={nome_change_handler} required /><br /><br />
        <label htmlFor="quantidade">Quantidade:</label>
        <input type="number" id="quantidade" name="quantidade" value={quantety} onChange={quantety_change_handler} required /><br /><br />
        <label htmlFor="valor">Valor:</label>
        <input type="number" id="valor" name="valor" value={value} onChange={value_change_handler} required /><br /><br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default UpdateItem;
