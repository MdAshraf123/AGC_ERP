import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Card from './Card';
import {MyContext} from './MyContext.jsx';



const Login=()=>{
    const navigate=useNavigate();
    const { login,extractdata }= useContext(MyContext);
    const [ username, setUsername ]=useState('');
    const [ password, setPassword ]=useState('');
    const [isrobot, setIsrobot]=useState(false);
     // i have to start from heare (i have to login)
    
        
     const formhandler= async (e)=>{
        e.preventDefault();
        if(username.trim().length === 0){
            alert('Input should not be white space!');
            return;
        }
        if(password.trim().length < 3){
            alert('Password should be of more than 3 characters!');
            return;
        }
        let data=await login(username, password);
       
        if(data){
             
            if(extractdata().role==='student')
                navigate('/dashboard');
            else if(extractdata().role ==='employee')
                navigate('/edashboard');
            else{
                alert('Rendaring failed!');
            }
        }else{
            alert('login failed! try again please');
        }
    }
    return(
        <Card heading="Login" style={{'height':'21rem',}} content={
            <>
                <form onSubmit={ formhandler }>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User id</label>
                        <input type="text" value={ username } onChange={ (e)=>{setUsername(()=> e.target.value)}} className="form-control" id="userName" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={ password } onChange={ (e)=>{setPassword(()=> e.target.value)}} className="form-control" id="exampleInputPassword1" required />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" checked={ isrobot } onChange={(e)=>{setIsrobot(e.target.checked)}} className="form-check-input" id="exampleCheck1" required />
                        <label className="form-check-label" htmlFor="exampleCheck1">I'm not a robot</label>
                    </div>
                    <button type="submit" disabled={!isrobot} className="btn btn-primary px-4">Login</button>
                </form>
                
            </>
        }/>
    )
}
export default Login;