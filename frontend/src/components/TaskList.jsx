import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api/tasks";
import { toast } from "react-toastify";
import EditTaskModal from "./EditTaskModal";

export default function TaskList({ reload }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(Array.isArray(res.data) ? res.data : []);
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

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "pending") return !task.isCompleted;
    return true;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Lista de Tareas</h2>

      <div className="flex flex-col gap-2 items-center mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded transition ${filter === "all"
            ? "bg-blue-500 text-white"
            : "bg-zinc-300 dark:bg-zinc-600 text-zinc-800 dark:text-white"
            }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-1 rounded transition ${filter === "completed"
            ? "bg-green-500 text-white"
            : "bg-zinc-300 dark:bg-zinc-600 text-zinc-800 dark:text-white"
            }`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-1 rounded transition ${filter === "pending"
            ? "bg-yellow-500 text-white"
            : "bg-zinc-300 dark:bg-zinc-600 text-zinc-800 dark:text-white"
            }`}
        >
          Pendientes
        </button>
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-center text-zinc-400">No hay tareas para mostrar.</p>
      )}

      {filteredTasks.map(task => (
        <div
          key={task.id}
          className="flex justify-between items-start bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow-sm transition-colors duration-300 mb-4"
        >
          <div>
            <h3
              className={`text-lg font-bold ${task.isCompleted
                ? 'line-through text-zinc-400'
                : 'text-zinc-800 dark:text-white'
                }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{task.description}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Creada el: {new Date(task.createdAt).toLocaleString()}</p>
          </div>

          <div className="flex flex-col gap-2 mt-2 sm:mt-0 sm:items-end">
            <button
              onClick={() => handleToggleComplete(task)}
              className="text-green-500 hover:text-green-400 font-semibold text-sm"
            >
              {task.isCompleted ? 'Desmarcar' : 'Completar'}
            </button>

            <button
              onClick={() => setEditingTask(task)}
              className="text-yellow-500 hover:text-yellow-400 text-sm"
            >
              Editar
            </button>

            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-400 font-semibold text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onTaskUpdated={loadTasks}
        />
      )}
    </div>
  );
}
