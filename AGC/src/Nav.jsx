import React from 'react';
import './Nav.css';
import logo1 from './assets/logo1.webp';
import  notification  from './assets/notification.png';
import menu from './assets/menu.png';
import {useState, useContext} from 'react';
import SideBar from './SideBar.jsx';
import Login from './Login.jsx';
import userlogo from './assets/user.png';
import { NavLink } from 'react-router-dom';
import { MyContext } from './MyContext.jsx';


function btnStyle({isActive}){
    return(
        {
            color:isActive ? 'red':'black',
            borderBottom: isActive? 'solid 2px': 'solid transparent',
        }
    )
}
const Nav=()=>{
    const [isOpen, setIsOpen]=useState(false);
    const [isLoginOpen, setIsLoginOpen]=useState(false);
    const {islogin}=useContext(MyContext);
    const clickHandler=()=>{
        setIsOpen((prev) => !prev); 
    }

    return(
        <>
        <div id="nevigate">
            <div className="logo">
                <img id="colge" src={logo1} alt="logo"></img>
            </div>
            <ul >
                <nav id="navlinks">
                    <li className="links"><NavLink to="/" style={btnStyle}>Home</NavLink></li>
                    <li className="links"><NavLink >About</NavLink></li>           
                    <li className="links"><NavLink >Contact</NavLink></li>
                    <li className="links"><button onClick={()=> setIsLoginOpen(true) }>Login</button></li>
                </nav>
            </ul>
            <div className="second">
                <img className="userimg" src={ userlogo } alt="user" />
            </div>
            <div className="menu-s">
                <div>
                <img className="notification" src={notification} alt="menu" />
                </div>
                <button className="menu-btn"  onClick={clickHandler}>
                    <img src={menu} alt="menu" />
                </button>
            </div>
        </div>
        {/* Side Bar Panel Here */}
        {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen } />}
        {isOpen && <SideBar  setIsOpen={setIsOpen} setIsLoginOpen={setIsLoginOpen} />}
        </>
    )
}
export default Nav;