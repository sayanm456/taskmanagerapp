import React from 'react'
import TaskContext from './TaskContext'

function TaskState(props) {
  return (
    <TaskContext.Provider>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState