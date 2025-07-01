import React,{forwardRef, useContext}from 'react';
import close from './assets/close.png';
import user from './assets/user.png';
import { MyContext } from './MyContext.jsx';
import { NavLink, Link } from 'react-router-dom';
import './SideBar.css'; 

const SideBar=forwardRef((props,ref)=>{
    const { islogin,user }=useContext(MyContext);
    console.log(user())//have to check it
    return (
        
        <div className="side-bar" ref={ref} style={{ display: "none" }}>
            <div className="close">
                <button className="ctrl-close" onClick={()=>props.setIsOpen(false)}>
                    <img src={close} alt="closeBtn" />
                </button> 
                <img className="profile-img" src={user}  />  
                <p className="user-name"><b>{ 'Ashraf' }</b></p> 
            </div>
            <div className="btns-container">
                { islogin ? (
                    <>
                        <div className='user'>
                            <div >
                                <h6>User</h6>
                            </div>                 
                            <ul> 
                                <li><NavLink to="/profile" className={'pannel-buttons'}>Profile</NavLink></li>
                                <li><NavLink  className="pannel-buttons">Change Password</NavLink></li>
                            </ul>               
                        </div>

                        <div className='academics'>
                            <div>
                                <h6>Academics</h6>
                            </div>
                            <ul>
                                <li><Link to="" className="pannel-buttons">Attendance</Link></li>
                                <li><a href=""><button className="pannel-buttons">Assignments</button></a></li>
                                <li><a href=""><button className="pannel-buttons">Academic Calender</button></a></li>
                                <li><a href=""><button className="pannel-buttons">Suplies</button></a></li>
                                <li><a href=""><button className="pannel-buttons">Result</button></a></li>
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
                    </>
                ):(
                  <>                                   
                    <ul style={{'listStyle':'none','padding':'0',}}> 
                        <li><NavLink to="/login" className={'pannel-buttons'}  onClick={()=>props.setIsOpen(false)}>Login</NavLink></li>         
                    </ul>                                   
                  </>  
                )}
            </div>
            
        </div>
        
    )
    
});
export default SideBar;