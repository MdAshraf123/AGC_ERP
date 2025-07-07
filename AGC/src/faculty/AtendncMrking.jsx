import React, {useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext.jsx';
import './atendncMrking.css'
import AtendncStuTemp from './AtendncStuTemp.jsx'
const AtendncMrking=()=>{
    const[selected, setSelected]=useState(',');
    const[students, setStudents]=useState([]);
    const { authFetch }= useContext(MyContext); 
    const [ options, setOptions]=useState([]);
    const[p_count, setP_Count]=useState(students.length);
    const[o_count,setO_Count]=useState(0);
    const[a_count,setA_Count]=useState(0);
    const isFirstRender=useRef(true);
    let navigate=useNavigate();
    useEffect(()=>{  
        authFetch('http://10.51.166.142:8000/api/allotment/',{
            method:'GET',
            headers:{},
        }, navigate)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            let info= data.map((sec, i)=> <option key={i} value={[sec.section.semester.department.dId, sec.section.semester.sem, sec.section.section, (sec.group || 'Full'), sec.subject]}>{sec.section.semester.department.name }, SEM-{sec.section.semester.sem }, {(sec.section.section).toUpperCase() }, {sec.group || 'FULL' }, {sec.subject}</option>)
            setOptions(info);
            setSelected(info[0].props.value.toString());
        })
        
    },[])

    useEffect(()=>{
        if(isFirstRender.current){
            isFirstRender.current=false;
            return;
        }
        let urlparams=selected.split(',');
        let url=`http://10.51.166.142:8000/api/students/?dept=${urlparams[0]}&sem=${urlparams[1]}&sec=${urlparams[2]}&group=${urlparams[3]}`;
        
        authFetch(url,{method:'GET',},navigate)
        .then((res)=>res.json())
        .then((data)=>{ let student=data.map(
            (s,i)=>{
                return <AtendncStuTemp key={i} sname={s.name} uroll={s.u_roll} count={[setP_Count, setO_Count, setA_Count]} />
            })
            setStudents(student);
        })
    },[selected])
    return(
        <> 
            <div className="atend-head-can">
                <div className="atend-head-control">
                    <label ><b>Select lecture</b></label>
                    <select value={selected } onChange={(e)=>{ setSelected(e.target.value);}}className="form-select" aria-label="Default select example">
                        {/* <option value="0">Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                        {options}
                    </select>
                </div>
                
                <div className="atend-head-div">
                    <div className="atend-info"><p>Present: {p_count}</p></div>
                    <div className="atend-info"><p>Out: {o_count}</p></div>
                    <div className="atend-info"><p>Total: {students.length}</p></div>
                </div>
            </div>
            { students }
            
            {/* <AtendncStuTemp sname={"Mohammad Ashraf"} uroll={"2234221"} count={[setP_Count, setO_Count, setA_Count]} />
            <AtendncStuTemp sname={"Rahul Kumar"} uroll={"2234226"} count={[setP_Count, setO_Count, setA_Count]} />
            <AtendncStuTemp sname={"Vishal Kumar"} uroll={"2234586"} count={[setP_Count, setO_Count, setA_Count]} />
            <AtendncStuTemp sname={"Nitin Choudhary"} uroll={"2247526"} count={[setP_Count, setO_Count, setA_Count]}/> */}
           <button className="btn btn-primary mt-4 mb-1 btn-lg" style= {{display:students.length==0? 'none': 'inline',}}>Submit</button>
        </>
    );
}
export default AtendncMrking;