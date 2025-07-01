import React from 'react';
import { useState } from 'react';
import './userProfile.css';
import close from './assets/close.png';
const UserProfile=()=>{
    const [ clsbtn, setClsbtn]=useState(true);
    return(
        <>
            <div className="profile-can" style={{ display: clsbtn ? 'block': 'none'}}>
                <div className='close-btn-div'>
                    <button onClick={()=>{ setClsbtn((prev)=> false) }}>
                        <img src={ close} alt="" />
                    </button>
                </div>
                <div className="profile-img-can">
                    <div className="profileImg"><img className="proImg" src="" alt="" /></div>
                    <div className='focusData' >
                        <h4>Mohammad Ashraf Ali</h4>
                        <p>6th sem</p>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Name <span>Mohammad Ashraf</span></li>
                    <li className="list-group-item">Father's Name <span>Imteyaz Ahmad</span></li>
                    <li className="list-group-item">Mother's Name <span></span></li>
                    <li className="list-group-item">class <span>B-Tech (CSe)</span></li>
                    <li className="list-group-item">U.Roll/C.Roll <span>2212206/2234221</span></li>
                    <li className="list-group-item">Sem <span>6th</span></li>
                    <li className="list-group-item">Batch<span>2022-2026</span></li>
                    <li className="list-group-item">Contact <span>9576188048</span></li>
                    <li className="list-group-item">Country <span>India</span></li>
                    <li className="list-group-item">State <span>Bihar</span></li>
                    <li className="list-group-item">Address <span>Siwan</span></li>
                </ul>
            </div>
        </>
    )
}
export default UserProfile;