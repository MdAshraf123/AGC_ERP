import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function Layout(){
    return(
        <>
            <Nav/>
            <Outlet/>
            <Footer/>
        </>
    )
};