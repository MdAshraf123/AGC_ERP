import '../cssfile/flashData.css';
import closebtn from  '../../assets/close.png';
const FlashData=(props)=>{
return(
<>
<div className="atendncStuTemp-display_studnet-view">
    <div className="display-data">
        <button className="display-data-close-btn" onClick={()=>{props.closebtn(false)}}><img src={ closebtn } alt="close"/>

        </button>
        <table>
            <tbody>
                <tr>
                    <td>Name : </td>
                    <td>{props.studentdata.sname}</td>
                </tr>
                <tr>
                    <td>U_roll : </td>
                    <td>{props.studentdata.uroll}</td>
                </tr>
                <tr>
                    <td>C_roll : </td>
                    <td>{props.studentdata.croll}</td>
                </tr>
                <tr>
                    <td>Father's name : </td>
                    <td>{props.studentdata.fatherName}</td>
                </tr>
                <tr>
                    <td>Section : </td>
                    <td>{props.studentdata.section}</td>
                </tr>
                <tr>
                    <td>Group : </td>
                    <td>{props.studentdata.group}</td>
                </tr>
            </tbody>
        </table>
        
    </div>
</div>
</>
);
}
export default FlashData;