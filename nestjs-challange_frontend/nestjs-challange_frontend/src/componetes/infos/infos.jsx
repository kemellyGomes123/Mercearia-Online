import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import './infos.css'


const UserInfo = () => {
    const [newBalance, setNewBalance] = useState();
    const accessToken = localStorage.getItem('accessToken');
    
    const userName = useSelector(state => state.user.name);
    const userRole = useSelector(state => state.user.role);
    const userBalance = useSelector(state => state.user.balance);
    const userEmail = useSelector(state => state.user.email);
    const userAddress = useSelector(state => state.user.address);
    const userId = useSelector(state => state.user.id);

    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleNewBalanceChange = (event) => {
        setNewBalance(Number(event.target.value)); // Convertendo o valor para número
    };

    const handleUpdateBalance = async (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        const response = await axios.patch(`http://localhost:3000/costumers/balance`, {saldo: newBalance} ,config);
        alert(response.data.msg)
        toggleModal()
  };

  return (
    <div>
      <h2>Informações do Usuário:</h2>
      <p><strong>Nome:</strong> {userName}</p>
      <p><strong>Função:</strong> {userRole}</p>
      <p><strong>Saldo:</strong> {userBalance}</p>
      <p><strong>Email:</strong> {userEmail}</p>
      <p><strong>Endereço:</strong> {userAddress}</p>
      <p><strong>ID:</strong> {userId}</p>
      <div>

        <button onClick={toggleModal}>Alterar Saldo</button>

        {isModalOpen && (
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
                <form onSubmit={handleUpdateBalance}>
                    <label htmlFor="newBalance">Novo Saldo:</label>
                    <input 
                        type="number" 
                        id="newBalance" 
                        value={newBalance} 
                        onChange={handleNewBalanceChange} 
                    />
                    <button type="submit">Atualizar</button>
                </form>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
