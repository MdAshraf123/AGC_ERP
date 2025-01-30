import React from "react";
import './atendncMrking.css'
const AtendncMrking=(props)=>{
    
    return(
        <>
            <div className="atend-head-div">
                <div className="atend-info"><p>Present: 46</p></div>
                <div className="atend-info"><p>Out: 98</p></div>
                <div className="atend-info"><p>Total: 98</p></div>
            </div>
            { props.content }
            {/* <div className="atend-stu">
                <div className="atend-stu-1">
                    <p>Mohammad Ashraf</p>
                    <p>2234221</p>
                </div>
                <div className="atend-stu-2">
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={selectedOption === "option1"} onChange={(e) => setSelectedOption(e.target.value)} />
                        <label className="btn btn-outline-success" htmlFor="btnradio1">P</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={selectedOption === "option1"} onChange={(e) => setSelectedOption(e.target.value)} />
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">O</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" checked={selectedOption === "option1"} onChange={(e) => setSelectedOption(e.target.value)} />
                        <label className="btn btn-outline-danger" htmlFor="btnradio3">A</label>
                    </div>
                </div>
            </div> */}
        </>
    );
}
export default AtendncMrking;