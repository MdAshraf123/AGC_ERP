import './timeTable.css';
import { useRef, useState, useEffect } from 'react';
import Table from '../components/compfile/Table';
const TimeTable=()=>{
    const tablelist=useRef([]);
    const [focusTable, setFocusTable]=useState(null);
    const [tableList, setTableList]=useState([<Table/>,<Table/>,<Table/>,<Table/>]);
    const [tableTempList, setTableTempList]=useState([]);
    const [is_sideview_open, setIs_sideview_open]=useState(0);
    const [isSwitch, setIsSwich]=useState({});
    
    let minimizeHandler=()=>{
        setIs_sideview_open((prev)=>{
            if( prev==0){
                return '-95%';
            }
            else{
                return '0';
            }
        });
    }


    useEffect(()=>{
        function focusHandler(e,i){
            setFocusTable(tableList[i]);
            console.log(tableList[0])

            setIsSwich({'border':'solid 1px'});
        }

       let list=tableList.map((t,i)=>{
            return <div key={i} onClick={(e)=>focusHandler(e,i)} style={isSwitch}>{t}</div>
       });

       setTableTempList(list);
       setFocusTable(tableList[0]);
        
    },[tableList])

    return(
        <>
            <div className="contianer">
                <div className="tool-bar">
                    <label htmlFor="deparment">Depart</label>
                    <input type="text" id="deparment" />
                    <label htmlFor="semester">Sem</label>
                    <input type="text" id="semester" />
                    <label htmlFor="section">Sec</label>
                    <input type="text" id="section" />
                    <button>Add</button>
                    <h4 className='title-bar'><ul>
                        <li>dept. </li>
                        <li>sem </li>
                        <li>sec </li>
                    </ul></h4>
                </div >
                <div className="container-body">
                    <div className="side-view" style={{'transform':`translateX(${is_sideview_open})`}}>
                    <div className="cards" >
                        
                        {tableTempList}
                        {/* <div>5</div> */}
                    </div>
                    <button className="minimize-btn" onClick={minimizeHandler} ></button>
                    </div>
                <div className="main-view">
                    <div className='editable-content'>
                        {focusTable}
                    </div>
                </div>
                </div>
                
            </div>
        </>
    )
}
export default TimeTable;
