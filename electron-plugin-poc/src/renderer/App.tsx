import React, { useState } from 'react'

const App = () => {
  const [tasks, setTasks] = useState<string[]>([])
  const [task, setTask] = useState<string>('')

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task])
      setTask('')
    }
  }

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div>
        <h1>To-Do List</h1>
        
        <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task"
        />
        
        <button onClick={addTask}>Add Task</button>
        
        <ul>
            {tasks.map((task, index) => (
            <li key={index}>
                {task} <button onClick={() => removeTask(index)}>Delete</button>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default App
