import React,{ useState} from 'react'
const AtendncStuTemp=(props)=>{
    const[selectedOption, setSelectedOption]=useState("P");
    return( 
        <div className="atend-stu">
                <div className="atend-stu-1">
                    <p>{props.sname}</p> 
                    <p>{props.uroll}</p>
                </div>
                <div className="atend-stu-2">
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name={`btnradio-${props.uroll}`} id={`btnradio1-${props.uroll}`} value="P" autoComplete="off" checked={selectedOption === "P"} onChange={(e) => setSelectedOption(e.target.value)} />
                        <label className="btn btn-outline-success" htmlFor={`btnradio1-${props.uroll}`}>P</label>

                        <input type="radio" className="btn-check" name={`btnradio-${props.uroll}`} id={`btnradio2-${props.uroll}`} value="O" autoComplete="off" checked={selectedOption === "O"} onChange={(e) => setSelectedOption(e.target.value)} />
                        <label className="btn btn-outline-primary" htmlFor={`btnradio2-${props.uroll}`}>O</label>

                        <input type="radio" className="btn-check" name={`btnradio-${props.uroll}`} id={`btnradio3-${props.uroll}`} value="A" autoComplete="off" checked={selectedOption === "A"} onChange={(e) => setSelectedOption(e.target.value)} />
                        <label className="btn btn-outline-danger" htmlFor={`btnradio3-${props.uroll}`}>A</label>
                    </div>
                </div>
            </div>
    )
}
export default AtendncStuTemp;