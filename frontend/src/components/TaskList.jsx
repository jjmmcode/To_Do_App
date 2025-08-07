import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api/tasks";
import { toast } from "react-toastify";
import EditTaskModal from "./EditTaskModal";

export default function TaskList({ reload }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, [reload]);

  const handleToggleComplete = async (task) => {
    await updateTask(task.id, {
      ...task,
      isCompleted: !task.isCompleted
    });
    toast.success(`Tarea ${!task.isCompleted ? 'completada' : 'desmarcada'} exitosamente`);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    toast.info('Tarea eliminada correctamente.');
    loadTasks();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Lista de Tareas</h2>

      {tasks.length === 0 && (
        <p className="text-center text-zinc-400">No hay tareas pendientes.</p>
      )}

      {tasks.map(task => (
        <div
          key={task.id}
          className="flex justify-between items-start bg-zinc-200 dark:bg-zinc-700 p-4 rounded-lg shadow-sm transition-colors duration-300"
        >
          <div>
            <h3
              className={`text-lg font-bold ${task.isCompleted ? 'line-through text-zinc-400' : 'text-white'}`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-zinc-300">{task.description}</p>
          </div>

          <div className="flex gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-end">
            <button
              onClick={() => handleToggleComplete(task)}
              className="text-green-400 hover:text-green-300 text-sm"
            >
              {task.isCompleted ? 'Desmarcar' : 'Completar'}
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
