import React, { useState } from 'react'
import TaskContext from './TaskContext'
import {CreateTask, UpdateTask, DeleteTask } from '../../apis/taskApi';
// const API_URL = `${process.env.SERVER_HOST}:${process.env.PORT}`

function TaskState(props) {
  const tasksinitial = [];
  const [tasks, setTasks] = useState(tasksinitial)
  const [error, setError] = useState(null)

  const createTask = async (title, description, due_date, status, priority, assigned_user) => {
    // API Call for AddTask Functionality with logic
    try {
      const response = await CreateTask(title, description, due_date, status, priority, assigned_user);

      if (response.success) {
        const newTask = response.newTask;
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        setError(response.message || 'Failed to create task');
      }

    } catch (error) {
      setError(error.message);
    }
  }

  const editTask = async (id, title, description, due_date, status, priority) => {
    // APi Call for EditTask Functionality with logic
    const taskJson = await UpdateTask(id, title, description, due_date, status, priority );
    setTasks(taskJson)
  }

  const deleteTask = async (id) => {
    // API Call for DeleteTask Functionality with logic
    const taskJson = await DeleteTask(id);
    setTasks(taskJson)
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
    <TaskContext.Provider value={{ tasks, error, createTask, editTask, deleteTask, getTasks, getTaskSummary }}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState