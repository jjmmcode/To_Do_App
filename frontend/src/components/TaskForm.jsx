import { useState } from "react";
import { createTask } from "../api/tasks";

export default function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask({ title, description, isCompleted: false });
        setTitle('');
        setDescription('');
        onTaskAdded();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Agregar Tarea</h2>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Descripción"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <button type="submit">Agregar</button>
        </form>
    );
}