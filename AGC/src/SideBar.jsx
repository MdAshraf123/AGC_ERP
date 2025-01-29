import React,{forwardRef}from 'react'
import close from './assets/close.png'
import user from './assets/user.png'
import './SideBar.css';
const SideBar=forwardRef((props,ref)=>{
    return (
        <div className="side-bar" ref={ref} style={{ display: "none" }}>
            <div className="close">

                <button className="ctrl-close" onClick={()=>props.setIsOpen(false)}>
                    <img src={close} alt="closeBtn" />
                </button> 
                <img className="profile-img" src={user}  />  
                <p className="user-name"><b>Mohammad Ashraf</b></p> 
            </div>
            <div className="btns-container">
                <div className='user'>
                    <div >
                        <h6>User</h6>
                    </div>                 
                    <ul>
                        <li>
                            <a href=""><button className="pannel-buttons">Profile</button></a>
                        </li>
                    </ul>               
                </div>

                <div className='academics'>
                    <div>
                        <h6>Academics</h6>
                    </div>
                    <ul>
                        <li><a href=""><button className="pannel-buttons">Assignments</button></a></li>
                        <li><a href=""><button className="pannel-buttons">Attendence</button></a></li>
                        <li><a href=""><button className="pannel-buttons">Academic Calender</button></a></li>
                    </ul>
                </div>

                <div className='academics'>
                    <div >
                        <h6>Other</h6>
                    </div>                 
                    <ul>
                        <li>
                            <a href=""><button className="pannel-buttons">Logout</button></a>
                        </li>
                    </ul>               
                </div>
            </div>
            
        </div>
    )
});
export default SideBar;