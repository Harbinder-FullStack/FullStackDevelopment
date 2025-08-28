import { useState } from "react";

export default function AddTask() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  return (
    <div className="add-item-container">
      <h2>Add Task</h2>

      <input type="text"  placeholder="Enter a task"
        value={task} 
        onChange={(e) => setTask(e.target.value)} />

      <button onClick={addTask}>Add</button>

      {
        tasks.length == 0 ?
        ( <p>No tasks added yet.</p> )  
        : 
        (
          <ul>
            {
              tasks.map(
                (t, i) => <li key={i}>{t}</li>
              )
            }
          </ul>
        )
      }
    </div>
  );
}
