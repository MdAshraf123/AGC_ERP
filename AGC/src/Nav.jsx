import React from 'react';
import './Nav.css';
import './Nav.js';
import logo1 from './assets/logo1.webp';
import  notification  from './assets/notification.png';
import menu from './assets/menu.png';
import {useRef,useEffect,useState} from 'react';
import SideBar from './SideBar.jsx';
import { NavLink } from 'react-router-dom';

function btnStyle({isActive}){
    return(
        {
            color:isActive ? 'red':'black',
            borderBottom: isActive? 'solid 2px': 'solid transparent',
        }
    )
}
const Nav=()=>{
    const sidebarRef=useRef();
    const [isOpen, setIsOpen]=useState(false);
    const clickHandler=()=>{
        setIsOpen((prev) => !prev);
    }
    useEffect(()=>{
        if (sidebarRef.current) {
            sidebarRef.current.style.display = isOpen ? "flex" : "none";
        }
    },[isOpen])

    return(
        <>
        <div id="nevigate">
            <div className="logo">
                <img id="colge" src={logo1} alt="logo"></img>
            </div>
            <ul >
                <nav id="navlinks">
                <li className="links"><NavLink to="/" style={btnStyle}>Home</NavLink></li>
                <li className="links"><NavLink to="/attendence" style={btnStyle}>Attendence</NavLink></li>
                <li className="links"><NavLink to="/profile">Profile</NavLink></li>
                <li className="links"><a href="" target="blank">semester fee</a></li>
                <li className="links"><a href="" target="blank">view</a></li>
                <li className="links"><a href="" target="blank">result</a></li>           
                <li className="links"><a href="" target="blank">central library</a></li>
                </nav>
            </ul>
            <div className="second">user</div>
            <div className="menu-s">
                <div>
                <img className="notification" src={notification} alt="menu" />
                {/* <FontAwesomeIcon icon="fa-regular fa-bell" /> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg> */}
                </div>
                <button className="menu-btn"  onClick={clickHandler}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> */}
                {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                {/* <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg> */}
                    <img src={menu} alt="menu" />
                {/* <i className="fa-solid fa-bars"></i> */}
                </button>
            </div>
        </div>
        {/* Side Bar Panel Here */}
        <SideBar ref={sidebarRef} setIsOpen={setIsOpen} />
        </>
    )
}
export default Nav;