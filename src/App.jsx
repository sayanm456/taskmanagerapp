import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
// import Layout from "./components/Layout"
import AdminDash from "./pages/AdminDash"
import TaskDash from "./pages/TaskDash"


function App() {

  return (
    <>
      <Router>
        <div className="flex align-items">
          <Sidebar />
          <div className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/admin" element={<h2 className="text-2xl">{<AdminDash/>}</h2>} />
              <Route path="/" element={<h2 className="text-2xl">{<TaskDash/>}</h2>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>


  )
}

export default App
