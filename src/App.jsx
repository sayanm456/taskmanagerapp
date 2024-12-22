import { BrowserRouter as Router } from "react-router-dom"
// import Layout from "./components/Layout"
import UIlayout from "./UIlayout/UIlayout"
import AuthState from "./contexts/auth/AuthState"
import TaskState from "./contexts/tasks/TaskState"


function App() {

  return (
    <>
      <TaskState>
        <AuthState>
          <Router>
            <UIlayout />
          </Router>
        </AuthState>
      </TaskState>
    </>
  )
}

export default App
