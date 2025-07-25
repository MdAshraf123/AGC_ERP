import React,{ useState, useEffect } from 'react';
import FlashData from '../components/compfile/FlashData.jsx';

const AtendncStuTemp=(props)=>{
    const[selectedOption, setSelectedOption]=useState(props.is_present);
    const[isOpenFlashData, setIsOpenFlashData]=useState(false);

    function handling(e) {
        const newSelection = e.target.value; // New selected value
        const prevSelection = selectedOption; // Previous selected value
    
        if (prevSelection !== newSelection) {
          // Decrease count for the previous selection
          if (prevSelection === "P") {
            props.count[0]((prev) => prev - 1);
          } else if (prevSelection === "O") {
            props.count[1]((prev) => prev - 1);
          } else {
            props.count[2]((prev) => prev - 1);
          }
    
          // Increase count for the new selection
          if (newSelection === "P") {
            props.count[0]((prev) => prev + 1);
          } else if (newSelection === "O") {
            props.count[1]((prev) => prev + 1);
          } else {
            props.count[2]((prev) => prev + 1);
          }
    
          setSelectedOption(newSelection); // Finally, update the state
        }
      }
    // console.log(props.count[0]);
   
    useEffect(()=>{
      props.setAttendnc((prev)=>{
         let record={
            ...prev
         }
                 
         let index=record.students.findIndex((obj)=>{
          return obj.students===props.croll; // .students is croll number
        });

        if(index!== -1){
          record.students[index].is_present=selectedOption;
        }
        else{
          // name:props.sname,
          //   uroll:props.uroll,
          record.students.push({
            id:props.id,
            students:props.croll, // the key students instead of croll is because serializer was expecting 'students' key           
            is_present:selectedOption,
          })
        }
        
        return record;
      });
      
      
    },[selectedOption])

    return( 
        <div className="atend-stu" onDoubleClick={ ()=>{setIsOpenFlashData(true)}}>
                <div className="atend-stu-1">
                    <p>{props.sname}</p> 
                    <p>{props.uroll}</p>
                </div>
                <div className="atend-stu-2">
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name={`btnradio-${props.uroll}`} id={`btnradio1-${props.uroll}`} value="P" autoComplete="off" checked={selectedOption === "P"} onChange={(e) => handling(e) } />
                        <label className="btn btn-outline-success" htmlFor={`btnradio1-${props.uroll}`}>P</label>

                        {/* <input type="radio" className="btn-check" name={`btnradio-${props.uroll}`} id={`btnradio2-${props.uroll}`} value="O" autoComplete="off" checked={selectedOption === "O"} onChange={(e) => handling(e) } />
                        <label className="btn btn-outline-primary" htmlFor={`btnradio2-${props.uroll}`}>O</label> */}

                        <input type="radio" className="btn-check" name={`btnradio-${props.uroll}`} id={`btnradio3-${props.uroll}`} value="A" autoComplete="off" checked={selectedOption === "A"} onChange={(e) => handling(e) } />
                        <label className="btn btn-outline-danger" htmlFor={`btnradio3-${props.uroll}`}>A</label>
                    </div>
                </div>
                {isOpenFlashData && <FlashData closebtn={setIsOpenFlashData} studentdata={props} />}
            </div>
    )
}
export default AtendncStuTemp;