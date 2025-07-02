import {createContext, useState} from 'react';

export const MyContext=createContext();

// let getdepartment='http://127.0.0.1:8000/api/departments/';
// let getsections='http://127.0.0.1:8000/api/sections/';
// let getsemester='http://127.0.0.1:8000/api/semester/';
// let getstudent='http://127.0.0.1:8000/api/student_profile/';

export function MyContextProvider({ children }){
    const [islogin, setIslogin]=useState(false);

    
    async function  refresh(){
        let refreshtoken='http://192.168.224.166:8000/api/token/refresh/';
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
            let apitoken='http://192.168.224.166:8000/api/token/';
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
                localStorage.clear();
                localStorage.setItem('access',data.access);
                localStorage.setItem('refresh',data.refresh);
                setIslogin(true);
                return true;
            }
            else{
                alert('please try again!')
            }
        return false;
    }

    function extractdata(){
        let payload=localStorage.getItem('access').split('.')[1];
        return JSON.parse(atob(payload));
    }

    function isAccessTokenValid() {
        const token = localStorage.getItem('access');
        if (!token) return false;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        return payload.exp > currentTime;
    }

//
    function user(){
        if(true){
            let userdata=extractdata();
            let url='http://192.168.224.166:8000/api/student_profile/';
            if(userdata.role=='employee')
                url='http://192.168.224.166:8000/api/employee/';

            return fetch(url ,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${ localStorage.getItem('access')}`,
                    }
                }
            )
            .then((resolve)=> resolve.json())
            .catch((rej)=>{
                return 'rejected';
            })
        }
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsLogin(false);
    };

    async function authFetch(url, options = {}) {
        if (!isAccessTokenValid()) {
            const refreshed = await refreshAccessToken();
            if (!refreshed) return;  // Refresh failed, user logged out
        }

        const access = localStorage.getItem('access');
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
        };

        return fetch(url, options);
    }


    return(
    <MyContext.Provider value={{login,user, refresh,extractdata, islogin, setIslogin}}>
        {children}
    </MyContext.Provider>
    )
}