import React, { useEffect } from 'react'
import Header from '../../components/ui/Header'
import TaskPage from '../../components/task/TaskPage'
import { useNavigate } from 'react-router-dom'

const AdminDash = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('authtoken')){
       navigate('/login')
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