import { useState } from "react";
import { createTask } from "../api/tasks";
import {toast} from 'react-toastify';

export default function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (title.trim().length === 0 || description.trim().length === 0) {
            alert('Los campos no pueden quedar vacíos.');
            return;
        }

        if (title.length > 50) {
            alert('El título no debe superar los 50 caracteres.');
            return;
        }

        if (description.length > 200) {
            alert('La descripción no debe superar los 200 caracteres.');
            return;
        }

        await createTask({ title, description, isCompleted: false});
        toast.success('¡Tarea agregada con éxito!')

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