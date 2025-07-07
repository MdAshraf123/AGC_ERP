import React,{forwardRef, useContext, useEffect, useState }from 'react';
import close from './assets/close.png';
import userimg from './assets/user.png';
import { MyContext } from './MyContext.jsx';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './SideBar.css'; 

const SideBar=forwardRef((props,ref)=>{
    const { islogin,setIslogin, user, isAccessTokenValid, refresh, logout }=useContext(MyContext);
    const [username, setUsername]=useState('User');
    const navigate= useNavigate();
    useEffect(
        ()=>{
            if(isAccessTokenValid()){
                setIslogin(true);
            }
            else{
                 refresh(navigate);
            }
            if(islogin){
                user().then((data)=>{
                    setUsername(()=>{ return data.name});
                })
            }
            
        },
        []
    )
    
    return (
        
        <div className="side-bar" ref={ref} style={{ display: "none" }}>
            <div className="close">
                <button className="ctrl-close" onClick={()=>props.setIsOpen(false)}>
                    <img src={close} alt="closeBtn" />
                </button> 
                <img className="profile-img" src={userimg} alt="user" />  
                <p className="user-name"><b>{ username }</b></p> 
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
                                <li><Link to="" className="pannel-buttons">Dashboard</Link></li>
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
                                    <button className="pannel-buttons" onClick={()=>{ logout(navigate)}}>Logout</button>
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