import React,{useState} from "react";
import axios from "axios";

import './login.css'
import { useNavigate } from "react-router-dom";

const Login =()  =>{
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const email_change_handler =(event)=>{ setEmail(event.target.value)}
    const password_change_handler =(event)=>{ setPassword(event.target.value)}

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            const request = await axios.post('http://localhost:3000/auth/signin',{
                email,password
            })
            localStorage.removeItem('accessToken');
            localStorage.setItem('accessToken', request.data.acess_token);
            console.log(request.data.acess_token)
            navigate("/home")
            
        }catch(error){
            console.log(error)
        }

    }
    return(
        <div className="card">
            <h1 className="card-header">Login Page</h1>
            <form onSubmit={handleSubmit}> 
            <div className="card-content">
                <label>Email</label>
                <input type="email" value={email} onChange={email_change_handler}></input>
            </div>

            <div className="card-content">
                <label>Password</label>
                <input type="password" value={password} onChange={password_change_handler}></input>
            </div>

            <div className="card-footer">
                <button type="submit"> login</button>
            </div>
            </form>
        </div>
    )
}

export default Login