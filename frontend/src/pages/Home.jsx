import { useState, useEffect } from 'react'
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaSun, FaMoon } from "react-icons/fa";


function Home() {
    const [reload, setReload] = useState(false)
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved ? saved === 'dark' : true
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
        localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    }, [darkMode])

    const toggleTheme = () => setDarkMode(!darkMode)

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white px-4 py-8 transition-colors duration-300">
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white px-4 py-2 rounded shadow hover:brightness-110 transition"
                >
                    {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-yellow-400" />}
                    {darkMode ? "Modo Claro" : "Modo Oscuro"}
                </button>

                <LogoutButton />
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
    )
}

function LogoutButton() {
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }
    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:brightness-110 transition">
            Cerrar sesión
        </button>
    )
}

export default Home
