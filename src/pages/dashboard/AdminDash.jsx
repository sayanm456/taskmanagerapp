import React, { useContext, useEffect } from 'react'
import Header from '../../components/ui/Header'
import TaskPage from '../../components/task/TaskPage'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/auth/AuthContext'

const AdminDash = () => {

  const navigate = useNavigate();
  const { user, role } = useContext(AuthContext);

  useEffect(() => {
    if(!localStorage.getItem('authtoken')){
       navigate('/login')
    }
    else if(role){
      navigate('/userdash')
    }
  }, [])

  return (
    <>
      <Header/>
      <TaskPage/>
    </>
  )
}

export default AdminDash