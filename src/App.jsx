import { BrowserRouter as Router } from "react-router-dom"
// import Layout from "./components/Layout"
import UIlayout from "./UIlayout/UIlayout"
import AuthState from "./contexts/auth/AuthState"


function App() {

  return (
    <>
      <AuthState>
        <Router>
          <UIlayout />
        </Router>
      </AuthState>
    </>


  )
}

export default App
