import React, { useContext, useState } from 'react'
import TaskContext from './TaskContext'

function TaskState(props) {
  const tasksinitial = [];
  const [tasks, setTasks] = useState(tasksinitial)
  const context = useContext(TaskContext);

  const createTask = (title, description, due_date, status, priority, assigned_user) => {
    // API Call for AddTask Functionality with logic
    setTasks(tasks)
  }

  const editTask = (id, title, description, due_date, status, priority) => {
    // APi Call for EditTask Functionality with logic
    setTasks(tasks)
  }

  const deleteTask = (id) => {
    // API Call for DeleteTask Functionality with logic
    setTasks(tasks)
  }

  const getTasks = (query) => {
    // API Call for GetTasks with Search Filter Functionality
    setTasks(tasks)
     
  }

  const getTaskSummary = (query) => {
    // API Call for GetTaskSummary with Search Filter Functionality
    setTasks(tasks)

  }

  return (
    <TaskContext.Provider value={{tasks, createTask, editTask, deleteTask, getTasks, getTaskSummary}}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState