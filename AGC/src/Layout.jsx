import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { useState, useContext, useEffect} from 'react';
import { MyContext } from './MyContext.jsx';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout(){
    const { islogin,refresh, user, setUserData}= useContext(MyContext);
    const navigate = useNavigate();

    useEffect(()=>{
        refresh(navigate);    
    },[])

    useEffect(()=>{
        if (islogin) {
        user().then((data) => {
            setUserData(data);
        });
    }
    },[islogin])
   
    return(
        <>
            <Nav/>
            <Outlet/>
            <Footer/>
        </>
    )
};