import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import Sidebar from '../components/Sidebar'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import TaskDash from '../pages/TaskDash'
import AdminDash from '../pages/AdminDash'

const UIlayout = () => {
  return (
        <div className="flex align-items">
          <Sidebar/>
          <div className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/admindash" element={<h2 className="text-2xl">{<AdminDash/>}</h2>} />
              <Route path="/userdash" element={<h2 className="text-2xl">{<TaskDash/>}</h2>}/>
              <Route path="/" element={<h2 className="text-2xl">{<Home/>}</h2>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
  )
}

export default UIlayout