import React from 'react'
import './atendncHome.css'
const AtendncHome=()=>{
    return(
            <>
                <button className="card-btn atten-btn">
                <h2>Student List</h2>
                <p>
                    Mark children <br/> lecture wise
                </p>
                </button>
                <button className="card-btn assign-btn">
                <h2>Upload Assignments</h2>
                <p>
                    Upload assignments <br/> lecture wise
                </p>
                </button>
            </>
    )
}
export default AtendncHome;