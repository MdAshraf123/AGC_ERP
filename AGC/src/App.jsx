import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {


  return (
    <>
      {/* <Table/> */}
      <Nav/> 
      {/* <UserProfile/> */}
      {/* <Card content={<UplodMtrials/>} style={{'height':'auto'}}/> */}
      {/* <Card content={<AtendncHome />}  style={{'height':'auto'}}/> */}

      {/* <Card content={<AtendncMrking />} style={{"height":"auto"}}/> */}
      
      {/* <Card content={<TodayAttends/>} heading={"Today Attends"} style={{"height":"15rem"}}/>
      <Card content={<AttendenceGraph style={{"width":"25%"}}/>} heading="Attendence"/>
      <Card content={<BookIssued/>} heading="Book Issued"/>  
      <Card content={<FeeStatus/>} heading="Fee Status"/> */}
      <Footer/>
    </>
  )
}

export default App
