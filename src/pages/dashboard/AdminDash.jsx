import { useContext, useEffect } from 'react'
import Header from '../../components/ui/Header'
import TaskPage from '../../components/task/TaskPage'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/auth/AuthContext'

const AdminDash = () => {

  const navigate = useNavigate();
  const { isAuthenticated, role } = useContext(AuthContext);

  useEffect(() => {
    if(!isAuthenticated && role!=="admin" && !localStorage.getItem('authtoken')){
       navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header/>
      <TaskPage/>
    </>
  )
}

export default AdminDash