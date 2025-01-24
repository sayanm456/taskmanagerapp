import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
// import Layout from "./components/Layout"
import UIlayout from "./UIlayout/UIlayout"
import AuthState from "./contexts/auth/AuthState"
import TaskState from "./contexts/tasks/TaskState"


function App() {

  return (
    <>
      <React.StrictMode>
        <TaskState>
          <AuthState>
            <Router>
              <UIlayout />
            </Router>
          </AuthState>
        </TaskState>
      </React.StrictMode>
    </>
  )
}

export default App
