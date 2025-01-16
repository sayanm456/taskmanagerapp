import { useContext, useEffect } from 'react'
import Header from '../../components/ui/Header'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth/AuthContext';

const TaskDash = () => {

  const navigate = useNavigate();

  const { user, role } = useContext(AuthContext);


  useEffect(() => {
    if ((!user || role!=="user") && !localStorage.getItem('authtoken')) {
      navigate('/login')
    }
  }, [user, role, navigate])
  return (
    <>
      <Header />
      <div>TaskDash</div>
    </>
  )
}

export default TaskDash