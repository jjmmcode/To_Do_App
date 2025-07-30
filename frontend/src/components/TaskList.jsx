import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api/tasks";

export default function TaskList({ reload }) {
    const [tasks, setTasks] = useState([]);

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
        loadTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                            {task.title}
                        </strong>
                        <p>{task.description}</p>
                        <button onClick={() => handleToggleComplete(task)}>
                            {task.isCompleted ? 'Desmarcar' : 'Completar'}
                        </button>
                        <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}