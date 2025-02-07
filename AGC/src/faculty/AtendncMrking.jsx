import React, {useState} from "react";
import './atendncMrking.css'
import AtendncStuTemp from './AtendncStuTemp.jsx'
const AtendncMrking=()=>{
    const total=4;
    const[p_count, setP_Count]=useState(total);
    const[o_count,setO_Count]=useState(0);
    const[a_count,setA_Count]=useState(0);
    
    return(
        <> 
            <div className="atend-head-can">
                <div className="atend-head-control">
                    <label ><b>Select lecture</b></label>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                
                <div className="atend-head-div">
                    <div className="atend-info"><p>Present: {p_count}</p></div>
                    <div className="atend-info"><p>Out: {o_count}</p></div>
                    <div className="atend-info"><p>Total: {total}</p></div>
                </div>
            </div>
            <AtendncStuTemp sname={"Mohammad Ashraf"} uroll={"2234221"} count={[setP_Count, setO_Count, setA_Count]} />
            <AtendncStuTemp sname={"Rahul Kumar"} uroll={"2234226"} count={[setP_Count, setO_Count, setA_Count]} />
            <AtendncStuTemp sname={"Vishal Kumar"} uroll={"2234586"} count={[setP_Count, setO_Count, setA_Count]} />
            <AtendncStuTemp sname={"Nitin Choudhary"} uroll={"2247526"} count={[setP_Count, setO_Count, setA_Count]}/>
           <button className="btn btn-primary mt-4 mb-1 btn-lg">Submit</button>
        </>
    );
}
export default AtendncMrking;