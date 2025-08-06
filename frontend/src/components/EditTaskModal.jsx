import { useState, useEffect } from "react";
import { updateTask } from "../api/tasks";
import { toast } from "react-toastify";


export default function EditTaskModal({ task, onClose, onTaskUpdated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(task.id, {
            
            ...task,
            title,
            description,
        });
        toast.success('Tarrea actualizada correctamente.');
        onTaskUpdated();
        onClose();
    };

    if (!task) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Editar Tarea</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)} required
                    />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)} required
                    />
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}