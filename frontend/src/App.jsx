import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-white">To-Do App</h1>
          <p className="text-lg text-zinc-400">Organiza tus tareas diarias</p>
        </header>

        <section className="bg-zinc-800 rounded-xl p-6 shadow-lg">
          <TaskForm />
        </section>

        <section className="bg-zinc-800 rounded-xl p-6 shadow-lg">
          <TaskList />
        </section>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;