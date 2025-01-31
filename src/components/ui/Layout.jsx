// import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className='grid'>
        <section><Sidebar/></section>
        <div><Header/></div>
        <div>{<Outlet/>}</div>
    </div>
  )
}

export default Layout