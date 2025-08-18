import { useState } from 'react';
import Table from './Table.jsx';
import Card from './Card.jsx';
import AttendenceGraph from './AttendenceGraph.jsx';
import BookIssued from './BookIssued.jsx';
import FeeStatus from './FeeStatus.jsx';
import TodayAttends from './TodayAttends.jsx';
import AtendncMrking from './faculty/AtendncMrking.jsx';
import TimeTable from './faculty/TimeTable.jsx';
import AtendncHome from './faculty/AtendncHome.jsx';
import UplodMtrials from './faculty/UplodMtrials.jsx';
import UserProfile from './UserProfile.jsx';
import Layout from './Layout.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import { MyContextProvider } from './MyContext.jsx';
import RoleProtectedRoute from './RoleProtectedRoute.jsx';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import ResetPassword from './components/compfile/ResetPassword.jsx';
import AcademicCalender from './components/compfile/AcademicCalender.jsx';
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
          path:'/resetpassword',
          element:<RoleProtectedRoute allowedRoles={['faculty','student']}>
                      <ResetPassword/>
                  </RoleProtectedRoute>,
        },
         {
          path:'/calender',
          element:<RoleProtectedRoute allowedRoles={['faculty','student']}>
                      <AcademicCalender/>
                  </RoleProtectedRoute>,
          
        },
        {
          path:'/profile',
          element:<RoleProtectedRoute allowedRoles={['faculty','student']}>
                      <UserProfile/>
                  </RoleProtectedRoute>,
        },
        {
          path:'/attendance',
          element:<RoleProtectedRoute allowedRoles={['faculty']}>
                      <Card content={<AtendncMrking />} style={{"height":"auto"}}/>
                  </RoleProtectedRoute>,
        },
        {
          path:'/dashboard',
          element:  <RoleProtectedRoute allowedRoles={ ['student']}>
                    <>
                      <Card content={<TodayAttends/>} heading={"Today Attends"} style={{"height":"15rem"}}/>
                      <Card content={<AttendenceGraph style={{"width":"25%"}}/>} heading="Attendence"/>
                      <Card content={<BookIssued/>} heading="Book Issued"/>  
                      <Card content={<FeeStatus/>} heading="Fee Status"/> 
                    </>
                  </RoleProtectedRoute>,
        },
        {
          path:'/edashboard',
          element:<RoleProtectedRoute allowedRoles={['faculty']}>
                      <AtendncHome />
                  </RoleProtectedRoute>,
        },
        {
          path:'/upload',
          element:<RoleProtectedRoute allowedRoles={['faculty']}>
                      <Card content={<UplodMtrials/>} style={{'height':'auto'}}/>
                  </RoleProtectedRoute>,
        }
      ]
    },
    
  ]
)

function App() {

  return (
    <>
      <MyContextProvider>
        {/* <TimeTable/> */}
       <RouterProvider router={router}/> 
      </MyContextProvider>  
    </> 
  )
}

export default App
