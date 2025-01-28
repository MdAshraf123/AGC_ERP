import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Nav from './Nav.jsx'
import Table from './Table.jsx'
import AttendenceGraph from './AttendenceGraph.jsx'

function App() {


  return (
    <>
      {/* <Table/> */}
      <Nav/>
      <AttendenceGraph/>
    </>
  )
}

export default App
