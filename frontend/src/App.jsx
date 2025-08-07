import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [reload, setReload] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white px-4 py-8 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white px-4 py-2 rounded shadow hover:brightness-110 transition">
          {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold">To-Do App</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Organiza tus tareas diarias
          </p>
        </header>

        <section className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
          <TaskForm onTaskAdded={() => setReload(!reload)} />
        </section>

        <section className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
          <TaskList reload={reload} />
        </section>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
