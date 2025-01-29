import React from 'react'
import './AttendenceGraph.css'
export default function (props){
    return(
        <>
            <div className="progress mt-1" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-info " style={props.style}>25%</div>
            </div>
            <div className="progress mt-1" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={props.style}>25%</div>
            </div>
            <div className="progress mt-1" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-success" style={props.style}>25%</div>
            </div>
            <div className="progress mt-1" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-danger" style={props.style}>25%</div>
            </div>
            <div className="progress mt-1" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-warning text-dark" style={props.style}>25%</div>
            </div>
            <div className="pallet">
                <div>
                    <span className='color-match bg-info'></span><span>Math</span>
                </div>
                <div>
                    <span className='color-match '></span><span>C++</span>
                </div>
                <div>
                    <span className='color-match bg-success'></span><span>WD</span>
                </div>
                <div>
                    <span className='color-match bg-danger'></span><span>RDBMS</span>
                </div>
                <div>
                    <span className='color-match bg-warning'></span><span>FE</span>
                </div>


            </div>
         
        </>
    );
};