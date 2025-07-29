import React from 'react'
import './clasUpldCntent.css'
import check from '../assets/check.png'
const ClasUpldCntent=(props)=>{
    return(
       <>
       <div className="clasUplds-card">
       <h2>{props.data.department}</h2>
        <div className="clas-info">
            <p>{props.data.semester}th sem</p>
            <p>{props.data.subject}</p>
        </div>
        
        <div className="asgnmnts">
            <img src={check} alt="i" className="asgnmnts-status" />
            <p>Assignment 1</p>
        </div>
        <div className="asgnmnts">
            <img src={ check} alt="i" className="asgnmnts-status" />
            <p>Assignment 2</p>
        </div>
       </div>
       </> 
    )
}
export default ClasUpldCntent;