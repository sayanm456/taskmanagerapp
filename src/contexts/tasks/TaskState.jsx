import React, { useContext } from 'react'
import TaskContext from './TaskContext'

function TaskState(props) {
  const context = useContext(TaskContext);

  return (
    <TaskContext.Provider>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState