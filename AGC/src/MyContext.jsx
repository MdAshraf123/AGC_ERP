import {createContext, useState} from 'react';
export const MyContext=createContext();

// let getdepartment='http://10.21.19.166:8000/api/departments/';
// let getsections='http://127.0.0.1:8000/api/sections/';
// let getsemester='http://127.0.0.1:8000/api/semester/';
// let getstudent='http://127.0.0.1:8000/api/student_profile/';

export function MyContextProvider({ children }){
    const [islogin, setIslogin]=useState(false);
   
    async function  refresh(navigate){
        console.log('refresh called')
        let refreshtoken='http://10.145.233.166:8000/api/token/refresh/';
        let refresh= localStorage.getItem('refresh');

        if(refresh){
            let response= await fetch(refreshtoken,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json',},
                    body:JSON.stringify({'refresh': refresh,}),
                }
            );
            if(response.status === 200){
                let jsondata= await response.json()
                let token=jsondata.access;
                localStorage.setItem('access',token );
                setIslogin(true);
                return true;
            }
            else if(response.status === 401){
                localStorage.clear();
                setIslogin(false);
                navigate('/');
            }
        
        }
        
    }

    async function login(user, pass){
            let apitoken='http://10.145.233.166:8000/api/token/';
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
            else if(response.status === 401){
                alert('Your credentials are wrong!');
            }
            else{ 
                alert('Something went wrong!');
            }
        return false;
    }

    function extractdata(){
        let payload=localStorage.getItem('access')
        if(payload){
            return JSON.parse(atob(payload.split('.')[1]));
        }
        return JSON.parse('{}');
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
        if(islogin){
            let userdata=extractdata();
            let url='http://10.145.233.166:8000/api/student_profile/';
            if(userdata.role=='faculty')
                url='http://10.145.233.166:8000/api/employee/';

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

    const logout = (navigate) => {
        localStorage.clear();
        localStorage.clear();
        setIslogin(false);
        console.log('logout')
        navigate('/');
    };

    async function authFetch(url, options = {},navig) {
        if (!isAccessTokenValid()) {
            const refreshed = await refresh(navig);
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
    <MyContext.Provider value={{login, logout, user, refresh,extractdata, islogin, setIslogin, isAccessTokenValid, authFetch }}>
        {children}
    </MyContext.Provider>
    )
}
