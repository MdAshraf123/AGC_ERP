import {createContext, useState} from 'react';

export const MyContext=createContext();

// let getdepartment='http://127.0.0.1:8000/api/departments/';
// let getsections='http://127.0.0.1:8000/api/sections/';
// let getsemester='http://127.0.0.1:8000/api/semester/';
// let getstudent='http://127.0.0.1:8000/api/student_profile/';

export function MyContextProvider({ children }){
    // const [loginData, setLoginData]=useState(null);
    async function  refresh(){
        let refreshtoken='http://127.0.0.1:8000/api/token/refresh/';
        let refresh= localStorage.getItem('refresh');

        if(refresh){
            let response= await fetch(refreshtoken,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json',},
                    body:JSON.stringify({'refresh': refresh,}),
                }
            );
            if(response.status== 200){
                let jsondata= await response.json()
                let token=jsondata.access;
                localStorage.setItem('access',token );
                return true;
            }
        
        }
        return false;
    }

    async function login(user, pass){
            let apitoken='http://127.0.0.1:8000/api/token/';
            let response=await fetch(apitoken,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json',},
                    body:JSON.stringify({
                        'username':user,
                        'password':pass,
                    })
                }
            )
            if(response.status==200){
                let data=await response.json();
                localStorage.setItem('access',data.access);
                localStorage.setItem('refresh',data.refresh);
                return true;
            }
            else{
                alert('please try again!')
            }
        return false;
    }

    function user(){
        
    };

    return(
    <MyContext.Provider value={{login, refresh}}>
        {children}
    </MyContext.Provider>
    )
}