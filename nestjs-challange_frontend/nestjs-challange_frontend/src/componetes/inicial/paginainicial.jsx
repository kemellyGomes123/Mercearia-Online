
import SingUp from "../signup/signup";
import Login from "../login/login";
import './paginaInicial.css'
import React, { useState } from 'react';

const PaginaInicial =()  =>{
    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); 
  };


    return(
        <div className="container" >
            
            {isChecked ? (
                <SingUp/>
            ) : (
                <Login/>
            )}
            <div className="switch-container">
                <p>login</p>
                <label className="switch">
                    <input type="checkbox" value={isChecked} on onChange={handleCheckboxChange}></input>
                    <span className="slider round"></span>
                </label>
                <p>sign up</p>
            </div>
            
        </div>
    )
}

export default PaginaInicial