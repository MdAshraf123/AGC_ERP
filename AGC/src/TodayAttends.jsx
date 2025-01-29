import React from "react";
import './todayAttends.css'
import flask from './assets/flask.png'
import presentation from './assets/presentation.png'
import letterT from './assets/letterT.png'
const TodayAttends=()=>{
    return(
        <div className="todayAttends-cont">
            <div className="tags">
                <div className="first-part"><span className="bullets"></span></div> <div className="second-part"><img src={ flask } alt="icon" /><span>RDBMS</span></div> 
            </div>
            <div className="tags">
                <div className="first-part"><span className="bullets"></span></div><div className="second-part"><img src={ presentation } alt="icon" /><span>C++</span></div> 
            </div>
            <div className="tags">
                <div className="first-part"><span className="bullets"></span></div><div className="second-part"><img src={ letterT } alt="icon" /><span>Math</span></div> 
            </div>
            <div className="tags">
                <div className="first-part"><span className="bullets"></span></div><div className="second-part"><img src={ flask } alt="icon" /><span>WD</span></div> 
            </div>
            <div className="tags">
                <div className="first-part"><span className="bullets"></span></div><div className="second-part"><img src={ flask } alt="icon" /><span>WD</span></div> 
            </div>
            <div className="tags">
                <div className="first-part"><span className="bullets"></span></div><div className="second-part"><img src={ flask } alt="icon" /><span>RDBMS</span></div> 
            </div>
            {/* <div className="tags">
                <div className="first-part"><span className="bullets"></span></div><div className="second-part"><img src={ flask } alt="icon" /><span>RDBMS</span></div> 
            </div> */}
            
        </div>
    )
}
export default TodayAttends;