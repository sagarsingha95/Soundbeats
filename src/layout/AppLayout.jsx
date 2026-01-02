import React from 'react'
import HomePage from '../pages/HomePage'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
const AppLayout = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default AppLayout