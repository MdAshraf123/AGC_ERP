import React, {useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext.jsx';
import './atendncMrking.css'
import AtendncStuTemp from './AtendncStuTemp.jsx'
const AtendncMrking=()=>{
    const[selectedLecture, setSelectedLecture]=useState(',');
    const[studentAttndcList, setStudentAttndcList]=useState([]);
    const { authFetch }= useContext(MyContext); 
    const [ scheduledLectures, setScheduledLectures]=useState([]);
    const[p_count, setP_Count]=useState(studentAttndcList.length);
    const[o_count,setO_Count]=useState(0);
    const[a_count,setA_Count]=useState(0);
    const [attendncData, setAttendncData]=useState({});
    const isFirstRender=useRef(true);
    let navigate=useNavigate();

    useEffect(()=>{  
        authFetch('http://10.58.38.166:8000/api/allotment/',{
            method:'GET',
            headers:{},
        }, navigate)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            if( data.length!=0){
                let lectureOptionList= data.map((sec, i)=> <option key={i} value={[sec.section.semester.department.dId, sec.section.semester.sem, sec.section.section, (sec.group || 'Full'), sec.subject]}>{sec.section.semester.department.name }, SEM-{sec.section.semester.sem }, {(sec.section.section).toUpperCase() }, {sec.group || 'FULL' }, {sec.subject}</option>)
                setScheduledLectures(lectureOptionList);      
                setSelectedLecture(lectureOptionList[0].props.value.toString());
            }
        })
        
    },[])

    useEffect(()=>{
        if(isFirstRender.current){
            isFirstRender.current=false;
            return;
        }
        let urlparams=selectedLecture.split(',');
        let url=`http://10.58.38.166:8000/api/students/?dept=${urlparams[0]}&sem=${urlparams[1]}&sec=${urlparams[2]}&group=${urlparams[3]}`;
        
        authFetch(url,{method:'GET',},navigate)
        .then((res)=>res.json())
        .then((data)=>{
             let studentList=data.map(
            (s,i)=>{
                return <AtendncStuTemp key={i} sname={s.name} uroll={s.u_roll} croll={s.c_roll} fatherName={s.father_name} section={s.sections.section} group={s.group.group} count={[setP_Count, setO_Count, setA_Count] } setAttendnc={setAttendncData} />
            })
            
            setStudentAttndcList(studentList);
            setP_Count(data.length);
            setO_Count(0);
            setA_Count(0);
            setAttendncData(
                {
                    dept:urlparams[0],
                    sem:urlparams[1],
                    sec:urlparams[2],
                    group:urlparams[3],
                    subject:urlparams[4],
                    students:[],
                }
            );
        })
    },[selectedLecture])

    console.log('list',attendncData) ;
    return(
        <> 
            <div className="atend-head-can">
                <div className="atend-head-control">
                    <label ><b>Select lecture</b></label>
                    <select value={ selectedLecture } onChange={(e)=>{ setSelectedLecture(e.target.value);}} className="form-select" aria-label="Default select example">
                        { scheduledLectures }
                    </select>
                </div>
                
                <div className="atend-head-div">
                    <div className="atend-info"><p>Present: {p_count}</p></div>
                    <div className="atend-info"><p>Absent: {a_count}</p></div>
                    <div className="atend-info"><p>Total: {studentAttndcList.length}</p></div>
                </div>
            </div>
            { studentAttndcList }
            
            {/* <AtendncStuTemp sname={"Mohammad Ashraf"} uroll={"2234221"} count={[setP_Count, setO_Count, setA_Count]} />
            <AtendncStuTemp sname={"Nitin Choudhary"} uroll={"2247526"} count={[setP_Count, setO_Count, setA_Count]}/> */}
           <button className="btn btn-primary mt-4 mb-1 btn-lg" style= {{display:studentAttndcList.length==0? 'none': 'inline',}}>Submit</button>
        </>
    );
}
export default AtendncMrking;