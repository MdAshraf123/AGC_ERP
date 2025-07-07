import React from 'react';
import './uplodMtrials.css';
import AtendncStuTemp from './AtendncStuTemp.jsx';
import Card from '../Card.jsx';
import ClasUpldCntent from './ClasUpldCntent.jsx';
import { useState} from 'react';
const UplodMtrials=()=>{
    const[select, setSelect]=useState(0);
    return(
        <>
            <div className="uplod-ctrl-can">
                <div className="form-floating mb-2">
                    <select className="form-select" id="floatingSelect" value={select} onChange={(e)=>{setSelect(e.target.value)}} aria-label="Floating label select example">
                        <option >Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <label htmlFor="floatingSelect">Select Class</label>
                </div>
                <div className="mb-3 mt-1 mb-1">
                    {/* <label htmlFor="formFile" className="form-label">Default file input example</label> */}
                    <input className="form-control" type="file" id="formFile" />
                </div>
                <button className="btn btn-primary mb-2">Submit</button>
            </div>
            <div className="doc-skelton">
                <h1>No Uploads Yet</h1>
            </div>
            <ClasUpldCntent/>
            {/* <Card content={} /> */}
             {/* <AtendncStuTemp sname={"Mohammad Ashraf"} uroll={"2234221"} /> count={[setP_Count, setO_Count, setA_Count] */}
        </>
    )
}
export default UplodMtrials;