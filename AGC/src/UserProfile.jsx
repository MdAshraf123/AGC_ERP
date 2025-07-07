import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './MyContext.jsx';
import './userProfile.css';
import close from './assets/close.png';
import userimg from './assets/user.png';
const UserProfile=()=>{
    const { user ,extractdata }=useContext(MyContext);
    const [userprofile, setUserprofile]=useState({});
    const [ role, setRole]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('access')){
            user().then((data)=>{
                setUserprofile(()=>data);
               setRole(extractdata().role);
            })
        }
    
    },[])

    return(
        <>
            <div className="profile-can" >
                <div className='close-btn-div'>
                    <button onClick={()=>{ navigate(-1) }}>
                        <img src={ close} alt="" />
                    </button>
                </div>
                <div className="profile-img-can">
                    <div className="profileImg"><img className="proImg" src={userimg} alt="" /></div>
                    <div className='focusData' >
                        <h4>{userprofile.name}</h4>
                        <p>{role=='employee'? userprofile.role: '6th sem'}</p>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Name <span>{ userprofile.name }</span></li>
                    {role==='employee'?
                    (<>
                        <li className="list-group-item">Designation <span>{ userprofile.role }</span></li>
                        <li className="list-group-item">Department <span>{ userprofile.department }</span></li>
                        <li className="list-group-item">Join Date <span>{ userprofile.joindate }</span></li>
                        <li className="list-group-item">Phone <span>{ userprofile.phone }</span></li>
                        <li className="list-group-item">Email <span>{ userprofile.email }</span></li>
                        <li className="list-group-item">City <span>{ userprofile.city }</span></li>
                        <li className="list-group-item">State <span>{ userprofile.state }</span></li>
                        <li className="list-group-item">Address <span>{ userprofile.address }</span></li>
                    </>):(
                        <>
                         { role === 'student'?(
                            <>
                            <li className="list-group-item">Father's Name <span>Imteyaz Ahmad</span></li>
                            <li className="list-group-item">Mother's Name <span></span></li>
                            <li className="list-group-item">Class <span>B-Tech (CSe)</span></li>
                            <li className="list-group-item">U.Roll/C.Roll <span>2212206/2234221</span></li>
                            <li className="list-group-item">Sem <span>6th</span></li>
                            <li className="list-group-item">Batch<span>2022-2026</span></li>
                            <li className="list-group-item">Contact <span>9576188048</span></li>
                            <li className="list-group-item">Country <span>India</span></li>
                            <li className="list-group-item">State <span>Bihar</span></li>
                            <li className="list-group-item">Address <span>Siwan</span></li>
                            </>
                            ):(<></>)}
                        </>
                       )
                        
                    
                    
                }
                    
                </ul>
            </div>
        </>
    )
}
export default UserProfile;