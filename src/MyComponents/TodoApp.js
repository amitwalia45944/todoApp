import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './TodoApp.css'

export const TodoApp = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [isDark, setTheme] = useState(false);

  const handleNewTask = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: uuidv4(), text: newTask, completed: false }]);
    }
    setNewTask('');
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };

  const handleUpdate = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editTaskText } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskText('');
  };

  const toggleChange = (id) => {
    const updatedTask = tasks.map((task) => {
      return task.id === id ? { ...task, completed: !task.completed } : task
    })

    setTasks(updatedTask);
  }

  const changeTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = !prevTheme;
      document.body.className = newTheme ? 'dark-theme' : 'light-theme';
      return newTheme;
    })
  }

  return (
    <>


      <header>
        <button onClick={changeTheme}>{isDark ? 'White' : 'Black'}</button>
      </header>

      <main>

        <div className='form-element'>
          <h1>HI , Welcome to TodoApp</h1>
          <input
            type='text'
            value={newTask}
            onChange={handleNewTask}>

          </input>


          <button type='submit' onClick={handleSubmit}>submit</button>

          <ul className='no-bullet-point'>

            {tasks.map((task) => {
              return <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>

                {editTaskId === task.id ? (
                  <>
                    <input
                      type='text'
                      value={editTaskText}
                      onChange={(e) => setEditTaskText(e.target.value)}
                    />
                    <button onClick={() => handleUpdate(task.id)}>Update</button>
                    <button onClick={() => setEditTaskId(null)}>Cancel</button>
                  </>
                ) : (
                  <>

                    {task.text}
                    <button onClick={() => toggleChange(task.id)}>{task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                    <button onClick={() => handleEdit(task)}>Edit</button>

                  </>
                )}

              </li>
            })}

          </ul>

          {
            tasks.length == 0 && <p>No tasks yet add a task above</p>
          }
        </div>
      </main>

    </>
  )
}
