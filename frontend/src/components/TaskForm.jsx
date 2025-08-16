import { useState } from "react";
import { createTask } from "../api/tasks";
import { toast } from 'react-toastify';


export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (title.trim().length === 0 || description.trim().length === 0) {
    toast.error('Los campos no pueden quedar vacíos.');
    return;
  }

  if (title.length > 50) {
    toast.error('El título no debe superar los 50 caracteres.');
    return;
  }

  if (description.length > 200) {
    toast.error('La descripción no debe superar los 200 caracteres.');
    return;
  }

  const task = { title, description, isCompleted: false };
  console.log("📤 Enviando tarea al backend:", task); // ⬅️ Log clave

  try {
    const res = await createTask(task);
    console.log("✅ Tarea creada:", res.data);

    toast.success('¡Tarea agregada con éxito!');
    setTitle('');
    setDescription('');
    onTaskAdded();
  } catch (error) {
    console.error("❌ Error al crear la tarea:", error); // ⬅️ Log de error
    toast.error('No se pudo agregar la tarea. Verifica la consola.');
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Agregar Tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="w-full px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
      >
        Agregar
      </button>
    </form>
  );
}
