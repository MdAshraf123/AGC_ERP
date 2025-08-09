import React from 'react';
import './uplodMtrials.css';
import AtendncStuTemp from './AtendncStuTemp.jsx';
import Card from '../Card.jsx';
import ClasUpldCntent from './ClasUpldCntent.jsx';
import {MyContext} from '../MyContext.jsx';
import{ useNavigate} from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
const UplodMtrials=()=>{
    const navigate=useNavigate();
    const[selectedLecture, setSelectedLecture]=useState(null);
    const[selectedFile, setSelectedFile]=useState(null);
    const [lectureOptList, setLectureOptList]=useState([]);
    const[fetchedAssignments, setFetchedAssignments]=useState([]);
    const{authFetch,}=useContext(MyContext);

    useEffect(()=>{
        authFetch(process.env.REACT_APP_API_BASE_UR+'allotlectures/',
            {
                method:'GET',
                headers:{},
            },
            navigate
        )
        .then( res=> res.json())
        .then(lectures=> {
            console.log(lectures)
            let lecList=lectures.map((lecture)=>{
                return <option key={Math.random()}>{lecture.section.semester.department.name},SEM-{lecture.section.semester.sem},{(lecture.section.section).toUpperCase()},{lecture.subject}</option>
            })
            setLectureOptList(lecList);

        })

    },[])

    useEffect(()=>{
        authFetch(process.env.REACT_APP_API_BASE_UR+'assignments/',
            {
                method:'GET',
                headers:{},
            },
            navigate
        )
        .then((res)=>res.json())
        .then((data)=>{
            setFetchedAssignments(data);
            console.log('assign',data);
        })

    },[])

    console.log('file',selectedFile)
    return(
        <>
            <div className="uplod-ctrl-can">
                <div className="form-floating mb-2">
                    <select className="form-select" id="floatingSelect" value={selectedLecture} onChange={(e)=>{setSelectedLecture(e.target.value)}} aria-label="Floating label select example">
                        <option key={49823}>Choose option</option>
                        { lectureOptList}
                        
                    </select>
                    <label htmlFor="floatingSelect">Select Class</label>
                </div>
                <div className="mb-3 mt-1 mb-1">
                    {/* <label htmlFor="formFile" className="form-label">Default file input example</label> */}
                    {/* // have to continue from here */}
                    <input className="form-control" type="file" accept="application/pdf" id="formFile"  onChange={(e)=>{ setSelectedFile(e.target.files[0])}} />
                </div>
                <button className="btn btn-primary mb-2" disabled={ !(selectedFile!=null && selectedLecture != 'Choose option')}>Submit</button>
            </div>
            
            { fetchedAssignments.length==0? 
            <div className="doc-skelton">
                <h1>No Uploads Yet</h1>
            </div>
            :
            <>
            { fetchedAssignments.map((rec,index)=> <ClasUpldCntent key={index} data={rec}  />)}
            </>
            }
            
            
            {/* <Card content={} /> */}
             {/* <AtendncStuTemp sname={"Mohammad Ashraf"} uroll={"2234221"} /> count={[setP_Count, setO_Count, setA_Count] */}
        </>
    )
}
export default UplodMtrials;