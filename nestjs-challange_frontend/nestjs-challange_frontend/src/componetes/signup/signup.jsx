import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './singUp.css'

const SingUp =()  =>{
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstname,setFirstName] = useState('')
    const [lastname,setLastName] = useState('')
    const [address,setAddress] = useState('')


    const email_change_handler =(event)=>{ setEmail(event.target.value)}
    const password_change_handler =(event)=>{ setPassword(event.target.value)}
    const firstname_change_handler =(event)=>{ setFirstName(event.target.value)}
    const lastname_change_handler =(event)=>{ setLastName(event.target.value)}
    const address_change_handler =(event)=>{ setAddress(event.target.value)}

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            const request = await axios.post('http://localhost:3000/auth/signup',{
                email,password,firstname,lastname,address
            })
            localStorage.setItem('accessToken', request.data.acess_token);
            
            console.log(request.data.acess_token)
            navigate("/home")
        }catch(error){
            console.log(error)
        }

    }

    return(
        <div className="card">
            <h1 className="card-header">SingUp Page</h1>
            <form onSubmit={handleSubmit} className="form_box"> 
            
            <div className="card-content">
                <label>Email</label>
                <input type="email" value={email} onChange={email_change_handler}></input>
            </div>

            <div className="card-content">
                <label>Password</label>
                <input type="password" value={password} onChange={password_change_handler}></input>
            </div>

            <div className="card-content">
                <label>First Name</label>
                <input type="text" value={firstname} onChange={firstname_change_handler}></input>
            </div>

            <div className="card-content">
                <label>Last Name</label>
                <input type="text" value={lastname} onChange={lastname_change_handler}></input>

            </div>
            <div className="card-content">
                <label>Morada</label>
                <input type="text" value={address} onChange={address_change_handler}></input>

            </div>
            <div className="card-footer">
                <button type="submit"> SingUp</button>
            </div>
            </form>
        </div>
    )
}

export default SingUp