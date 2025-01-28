import React from 'react'
import './AttendenceGraph.css'
export default function (){
    return(
        <>
        <div className="box b2">
            <h1>Attendance</h1>
            <svg viewBox="0 0 100% 100%">
                <line className="bar-track" x1="10" y1="40" x2="280" y2="40"></line>
                <line className="bar" x1="10" y1="40" x2="90" y2="40"></line>
                <line className="bar-track" x1="10" y1="55" x2="280" y2="55"></line>
                <line className="bar" x1="10" y1="55" x2="100" y2="55"></line>
                <line className="bar-track" x1="10" y1="70" x2="280" y2="70"></line>
                <line className="bar" x1="10" y1="70" x2="150" y2="70"></line>
                <line className="bar-track" x1="10" y1="85" x2="280" y2="85"></line>
                <line className="bar" x1="10" y1="85" x2="50" y2="85"></line>
                <line className="bar-track" x1="10" y1="100" x2="280" y2="100"></line>
                <line className="bar" x1="10" y1="100" x2="70" y2="100"></line>
                <line className="bar-track" x1="10" y1="115" x2="280" y2="115"></line>
                <line className="bar" x1="10" y1="115" x2="40" y2="115"></line>
                <line className="bar-track" x1="10" y1="130" x2="280" y2="130"></line>
                <line className="bar" x1="10" y1="130" x2="100" y2="130"></line>
            </svg>
        </div>
        </>
    );
};