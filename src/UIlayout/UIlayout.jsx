import { Routes, Route } from "react-router-dom"
import Home from '../pages/uiPage/Home'
import Sidebar from '../components/ui/Sidebar'
import AdminDash from '../pages/dashboard/AdminDash'
import TaskDash from '../pages/dashboard/TaskDash'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'


const UIlayout = () => {
  return (
        <div className="flex align-items gap-x-2">
          <Sidebar/>
          <div className="container flex-1 bg-gray-100">
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