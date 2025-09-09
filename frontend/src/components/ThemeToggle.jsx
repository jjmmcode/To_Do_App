export default function ThemeToggle({ darkMode, toggleTheme }) {
    return (
        <button
            onClick={toggleTheme}
            className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white px-4 py-2 rounded shadow hover:brightness-110 transition"
        >
            {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>
    );
}