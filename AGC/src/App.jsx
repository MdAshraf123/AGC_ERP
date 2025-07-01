import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MyContextProvider } from './MyContext.jsx'
import Nav from './Nav.jsx'
import Table from './Table.jsx'
import Card from './Card.jsx'
import AttendenceGraph from './AttendenceGraph.jsx'
import BookIssued from './BookIssued.jsx'
import FeeStatus from './FeeStatus.jsx'
import Footer from './Footer.jsx'
import TodayAttends from './TodayAttends.jsx'
import AtendncMrking from './faculty/AtendncMrking.jsx'
import AtendncHome from './faculty/atendncHome.jsx'
import UplodMtrials from './faculty/UplodMtrials.jsx'
import UserProfile from './UserProfile.jsx'
import Layout from './Layout.jsx';
import Login from './Login.jsx'
import Home from './Home.jsx'
import { MyContext } from './MyContext'
import { useContext } from 'react'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'

const router=createBrowserRouter(
  [
    {
      path:'',
      element:<Layout/>,
      children:[
        {
          path:'',
          element:<Home/>,
        },
        {
          path:'/login',
          element:<Login/>,
        },
        {
          path:'/profile',
          element:<UserProfile/>,
        },
        {
          path:'/attendance',
          element:<Card content={<AtendncMrking />} style={{"height":"auto"}}/>,
      
        },
        {
          path:'/dashboard',
          element:<>
                    <Card content={<TodayAttends/>} heading={"Today Attends"} style={{"height":"15rem"}}/>
                    <Card content={<AttendenceGraph style={{"width":"25%"}}/>} heading="Attendence"/>
                    <Card content={<BookIssued/>} heading="Book Issued"/>  
                    <Card content={<FeeStatus/>} heading="Fee Status"/> 
                  </>,
        },
        {
          path:'/edashboard',
          element:<Card content={<AtendncHome />}  style={{'height':'auto'}}/>,
        },
        {
          path:'/upload',
          element:<Card content={<UplodMtrials/>} style={{'height':'auto'}}/>,
        }
      ]
    },
    
  ]
)

function App() {
  const[is_open, setIsOpen]=useState(false);
  const { login, refresh }=useContext(MyContext)

  return (
    <>
      {/* <Table/> */} 
      <RouterProvider router={router}/>   
    </> 
  )
}

export default App
