import React, {useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext.jsx';
import './atendncMrking.css';
import AtendncStuTemp from './AtendncStuTemp.jsx';

const AtendncMrking=()=>{
    const[selectedLecture, setSelectedLecture]=useState(',');
    const[studentAttndcList, setStudentAttndcList]=useState([]);
    const { authFetch }= useContext(MyContext); 
    const [ scheduledLectures, setScheduledLectures]=useState([]);
    const[p_count, setP_Count]=useState(0);
    const[o_count,setO_Count]=useState(0);
    const[a_count,setA_Count]=useState(0);
    const [attendncData, setAttendncData]=useState({});
    const isFirstRender=useRef(true);
    let navigate=useNavigate();

    async function attendcPutHandler(){
        let url=process.env.REACT_APP_API_BASE_URL+'students/';
        let response= await authFetch(url,
            {
            method: 'PUT',
            body:JSON.stringify(attendncData),
            },navigate);
        if(response.status==200){
            let data= await response.json();
            alert(data.message)
        }

            
    }
    useEffect(()=>{  
        authFetch(process.env.REACT_APP_API_BASE_URL+'allotclass_of_day/',{
            method:'GET',
            headers:{},
        }, navigate)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            // console.log('allot',data[0].group.group)
            if( data.length!=0){
                let lectureOptionList= data.map((sec, i)=> {
                    let group=null;
                    if(sec.group){
                        group=sec.group.group;
                    }
                 return <option key={i} value={[sec.section.semester.department.dId, sec.section.semester.sem, sec.section.section, (group || 'Full'), sec.subject]}>{sec.section.semester.department.name }, SEM-{sec.section.semester.sem }, {(sec.section.section).toUpperCase() }, {group || 'FULL' }, {sec.subject}</option>
                })
                setScheduledLectures(lectureOptionList);      
                setSelectedLecture(lectureOptionList[0].props.value.toString());
            }
        })
    },[])
    // ye useEffect 'selectedLecture' ke update hone pr run hoga aur database se student data fetch kr ke list kr dega
    useEffect(()=>{
        
        if(isFirstRender.current){
            isFirstRender.current=false;
            return;
        }
        let urlparams=selectedLecture.split(',');
        let url=process.env.REACT_APP_API_BASE_URL+`students/?dept=${urlparams[0]}&sem=${urlparams[1]}&sec=${urlparams[2]}&group=${urlparams[3]}`;
        
        authFetch(url,{method:'GET',},navigate)
        .then((res)=>res.json())
        .then((data)=>{
            console.log('students ',data);
            setA_Count(0);//bas aise hi likh diya hu takin accidently ye encrease na ho
            setP_Count(0);
            setA_Count(0);
            setAttendncData({});
            setStudentAttndcList([]);
             let studentList=data.map(
            (s,i)=>{
                // jab bhi lecture option ko select kiya jayega to ye count update ho jayega.
                // ye data base ka data ka use kr ke present/absent show krega
                if(s.is_present==='P'){
                    setP_Count((prev)=> prev+1)
                }
                else{
                    setA_Count((prev)=>prev+1)
                }
                return <AtendncStuTemp key={i+'-'+s.id+'-'+Date.now()} id={s.id} sname={s.student.name} uroll={s.student.u_roll} croll={s.student.c_roll} fatherName={s.student.father_name} section={s.student.sections.section} group={s.student.group.group} is_present={ s.is_present } count={[setP_Count, setO_Count, setA_Count] } setAttendnc={setAttendncData} />
            })
            
            setStudentAttndcList(studentList);
          
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
           <button className="btn btn-primary mt-4 mb-1 btn-lg" onClick={ attendcPutHandler } style= {{display:studentAttndcList.length==0? 'none': 'inline',}}>Submit</button>
        </>
    );
}
export default AtendncMrking;