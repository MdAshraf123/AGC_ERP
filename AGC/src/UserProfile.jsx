import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './MyContext.jsx';
import './userProfile.css';
import close from './assets/close.png';
import userimg from './assets/user.png';
import Spinner from './components/compfile/Spinner.jsx';

const UserProfile=()=>{
    const { islogin ,extractdata,userData }=useContext(MyContext);
    const [userprofile, setUserprofile]=useState({});
    const [ role, setRole]=useState('');
    const navigate=useNavigate();

    useEffect(()=>{

        
        if(islogin && localStorage.getItem('access')){
            setUserprofile(userData);
            setRole(extractdata().role);
            
        }
    
    },[])
    console.log(userprofile)

    if (Object.keys(userprofile).length ==0){
        return (         
            <Spinner/>
        );
    }

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
                        <p>{role=='faculty'? userprofile.role:  userprofile.semester+"th sem" }</p>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    
                    {role==='faculty'?
                    (<>
                        <li className="list-group-item">Name <span>{ userprofile.name }</span></li>
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
                            <li className="list-group-item">Father's Name <span>{ userprofile.father_name }</span></li>
                            <li className="list-group-item">Mother's Name <span>{userprofile.mother_name}</span></li>
                            <li className="list-group-item">Class <span>{ userprofile.course }</span></li>
                            <li className="list-group-item">Batch<span>{ userprofile.batch }</span></li>
                            <li className="list-group-item">U.Roll/C.Roll <span>{ userprofile.u_roll }/{ userprofile.c_roll }</span></li>
                            <li className="list-group-item">Section <span>{ userprofile.sections }</span></li>
                            <li className="list-group-item">Group <span>{ userprofile.group }</span></li>
                            <li className="list-group-item">Contact <span>{ userprofile.phone}</span></li>
                            <li className="list-group-item">City <span>{ userprofile.city }</span></li>
                            <li className="list-group-item">State <span>{ userprofile.state }</span></li>
                            <li className="list-group-item">Country <span>{ userprofile.country }</span></li>
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