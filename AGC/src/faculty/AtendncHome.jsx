import React from 'react';
import { Link } from 'react-router-dom';
import './atendncHome.css';
const AtendncHome=()=>{
    return(
            <div className="faculty-dash-background">
                <Link to="/attendance" className="card-btn atten-btn">
                <h2>Student List</h2>
                <p>
                    Mark children <br/> lecture wise
                </p>
                </Link>

                <Link to="/upload" className="card-btn assign-btn">
                <h2>Upload Assignments</h2>
                <p>
                    Upload assignments <br/> lecture wise
                </p>
                </Link>

                
            </div>
    )
}
export default AtendncHome;