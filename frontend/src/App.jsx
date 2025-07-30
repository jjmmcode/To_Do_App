import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useState } from 'react';
import './App.css';

function App() {
  const [reload, setReload] = useState(false);

  const reloadTask = () => setReload(prev => !prev);

  return (
    <div className="app-container">
      <h1>To-Do App de Joel</h1>
      <TaskForm onTaskAdded={reloadTask} />
      <TaskList reload={reload} />
    </div>
  );
}

export default App;