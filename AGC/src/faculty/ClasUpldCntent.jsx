import React from 'react'
import './clasUpldCntent.css'
import check from '../assets/check.png'
const ClasUpldCntent=()=>{
    return(
       <>
       <div className="clasUplds-card">
       <h2>B-Tech (CSc)</h2>
        <div className="clas-info">
            <p>6th sem</p>
            <p>ML</p>
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