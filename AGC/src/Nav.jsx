import React from 'react'
import './Nav.css'
import './Nav.js'
import logo1 from './assets/logo1.webp'
import  BarIcon  from './assets/bars.svg'
import menu from './assets/menu.png'
import {useRef,useEffect,useState} from 'react'
import SideBar from './SideBar.jsx'

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
                <li className="links"><a href="new.html" target="blank">home</a></li>
                <li className="links"><a href="" target="">academic content</a></li>
                <li className="links"><a href="" target="blank">document request</a></li>
                <li className="links"><a href="" target="blank">semester fee</a></li>
                <li className="links"><a href="" target="blank">view</a></li>
                <li className="links"><a href="" target="blank">result</a></li>           
                <li className="links"><a href="" target="blank">central library</a></li>
                </nav>
            </ul>
            <div className="second">user</div>
            <div className="menu-s">
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