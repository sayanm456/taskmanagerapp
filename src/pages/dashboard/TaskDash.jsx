import { useContext, useEffect } from 'react'
import Header from '../../components/ui/Header'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth/AuthContext';

const TaskDash = () => {

  const navigate = useNavigate();

  const { isAuthenticated, role } = useContext(AuthContext);
  console.log(role);


  useEffect(() => {
    if ((!isAuthenticated && role!=="user") && !localStorage.getItem('authtoken')) {
      navigate('/login')
    }
  }, [isAuthenticated, role, navigate])
  return (
    <>
      <Header />
      <div>TaskDash</div>
    </>
  )
}

export default TaskDash