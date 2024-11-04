import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import Layout from "./components/Layout"
import Header from "./components/Header"


function App() {

  return (
    <>
      <Router>
        <div className="flex align-items">
          <Sidebar />
          <div className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<h2 className="text-2xl">{<Header/>}</h2>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>


  )
}

export default App
