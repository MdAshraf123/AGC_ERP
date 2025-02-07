import React from 'react'
import './login.css'
import Card from './Card'
const Login=()=>{
    return(
        <Card heading="Login" style={{'height':'21rem',}} content={
            <>
                <form>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User id</label>
                        <input type="text" className="form-control" id="userName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">I'm not a robot</label>
                    </div>
                    <button type="submit" className="btn btn-primary px-4">Login</button>
                </form>
                
            </>
        }/>
    )
}
export default Login;