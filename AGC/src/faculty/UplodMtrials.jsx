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
    const{authFetch,}=useContext(MyContext);
    const HOST_URL='http://10.119.165.166:8000/'
    useEffect(()=>{
        authFetch(HOST_URL+'api/allotlectures/',
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
                    <input className="form-control" type="file" accept="application/pdf" id="formFile"  onChange={(e)=>{selectedFile(e.target.value)}} />
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