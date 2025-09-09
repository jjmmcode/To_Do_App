// src/pages/Login.jsx
import { useState } from "react";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/tasks", { replace: true }); 
        } catch (err) {
            const msg =
                typeof err.response?.data === "string"
                    ? err.response.data
                    : "Error al iniciar sesión";
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen grid place-items-center bg-white dark:bg-zinc-900 text-black dark:text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>

                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded p-2"
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded p-2"
                    required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:brightness-110"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
