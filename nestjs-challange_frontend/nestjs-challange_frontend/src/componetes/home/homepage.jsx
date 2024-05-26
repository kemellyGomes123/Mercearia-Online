 
import AddItem from "../item/additem";
import Orders from "../orders/orders";
import React,{useState,useEffect} from "react";
import axios from "axios";



import '../menu/sidemenu.css'
import MyOrders from '../orders/my_orders';
import Orders_Id from '../orders/orders_id';
import UserInfo from "../infos/infos";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUserName ,setUserRole} from '../../store/userSlice';

const HomePage =()  =>{
    const dispatch = useDispatch();
    const userName = useSelector(state => state.user.name);
    const userRole = useSelector(state => state.user.role);

    const accessToken = localStorage.getItem('accessToken');
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [Role, setRole] = useState(false);

    useEffect(() => {
        find();
    }, );


    async function find(){
        try{
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        const user_Info = await axios.get('http://localhost:3000/costumers/me', config);
        const role = user_Info.data.role;
        dispatch(addUser({
            name: user_Info.data.first_name + " " + user_Info.data.last_name,
            role: user_Info.data.role,
            balance: user_Info.data.saldo,
            email: user_Info.data.email,
            address: user_Info.data.address,
            id: user_Info.data.id
          }));
        dispatch(setUserRole(user_Info.data.role))
        
        if(userRole ==="AGENT"){
            setRole(true);
        }}catch(error){console.log(error)}
    }

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    let contentComponent;
    switch (selectedMenuItem) {
        case 'Items':
            contentComponent = <AddItem />;
            break;
        case 'New Order':
            contentComponent = <MyOrders />;
            break;
        case 'My Orders':
            contentComponent = <Orders_Id/>;
            break;
        case 'All Orders':
            contentComponent = <Orders/>;
            break;
        case 'Infos':
            contentComponent = <UserInfo/>;
            break;
        default:
            contentComponent = null;
    }

    return(
        <div>
            <div className="menu">
                <div className={`sidebar open`}>
                    <ul>
                        <li onClick={() => handleMenuItemClick('Items')}>Items</li>
                        <li onClick={() => handleMenuItemClick('New Order')}>New Orders</li>
                        <li onClick={() => handleMenuItemClick('My Orders')}>My Orders</li>
                        {Role ?(<li onClick={() => handleMenuItemClick('All Orders')}>All Orders</li>):(<></>)}
                        <li onClick={() => handleMenuItemClick('Infos')}>Infos</li>
                    </ul>
                </div>
            
                <div className={`content open`}>
                   
                    <div>
                        {contentComponent}
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default HomePage