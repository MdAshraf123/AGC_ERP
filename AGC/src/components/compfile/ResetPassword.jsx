import '../cssfile/resetPassword.css';
import { useState, useContext } from 'react';
import { MyContext } from '../../MyContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword=(props)=>{
    console.log('resetpassword')
    const [oldPassword, setOldPassword]=useState('');
    const [newPassword, setNewPassword]=useState('');
    const [ errorMessage, setErrorMessage]=useState('');
    const {refresh }=useContext(MyContext);
    let navigate=useNavigate();
    function formHandler(e){
        e.preventDefault()
        let input=e.target;
        
        if(newPassword =='' || oldPassword ==''){
            setErrorMessage('Password should not be blank!');
            // input.setCustomValidity('password should not be blank')//to show error in default yellow tooltip box;
        }
        else if(newPassword.length<5 || oldPassword.length <2){
            setErrorMessage('Password length should be at least 5!');
        }
        else if(!/[a-z]/.test(newPassword)){
            setErrorMessage('New password must contain a lowercase letter!');
        }
        else if(!/[A-Z]/.test(newPassword)){
            setErrorMessage('New password must contain an uppercase letter!');
        }
        else if(!/[\d]/.test(newPassword)){
            setErrorMessage('New password must contain a number!');
        }
        else if(!/[\-#@%&*!+=_$^]/.test(newPassword)){
            setErrorMessage('New password must contain an special char [\-#@%&*!+=_$^]!');
        }
        else {
            setErrorMessage('');
            if( refresh(navigate) ){
                (async function(){
                    return fetch('http://10.58.38.166:8000/api/resetpassword/',
                    {
                        method:'PUT',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access')}`,
                        },
                        body:JSON.stringify(
                            {
                                'oldPassword':oldPassword,
                                'newPassword':newPassword,       
                            }
                        )
                })
                .then((res)=> res.json())
                .then((data)=>{
                    alert(data.message + '\nPlease login again.');

                })
                })()
            }
        }
       
    }
    return(
    <>
            <div className="password-container">
                <h2>Reset Password</h2>
                <form className="row g-3" onSubmit={ formHandler }>
                <div className="row-md-6">
                    <label htmlFor="inputPassword5" className="form-label">Old password</label>
                    <input type="password" value={ oldPassword } onChange={ (v)=>{setOldPassword(v.target.value.replace(/\s/g,''))}} className="form-control" id="inputPassword5"/>
                </div>

                <div className="row-md-6">
                    <label htmlFor="inputPassword4" className="form-label">New Password</label>
                    <input type="password" value={ newPassword } onChange={ (v)=>{ setNewPassword(v.target.value.replace(/\s/g,''))}} className="form-control" id="inputPassword4"/>
                </div>
                
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </form>
                <p id="error-message">{ errorMessage }</p>
            </div>
    </>
    );
}
export default ResetPassword;