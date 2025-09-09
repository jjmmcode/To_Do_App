import { FaUser, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

export default function Auth() {
    const [mode, setMode] = useState("login"); // "login" | "register"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [username, setUsername] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    // mismo toggle de tema que en Home
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved ? saved === 'dark' : true
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
        localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    }, [darkMode])

    const toggleMode = () => {
        setErr("");
        setPassword("");
        setConfirm("");
        setMode((m) => (m === "login" ? "register" : "login"));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");

        try {
            setLoading(true);

            if (mode === "login") {
                const res = await api.post("/auth/login", { email, password });
                localStorage.setItem("token", res.data.token);
                navigate("/tasks", { replace: true });
                return;
            }

            // register
            if (password !== confirm) {
                setErr("Las contraseñas no coinciden");
                return;
            }

            await api.post("/auth/register", { username, email, password });

            // auto-login
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/tasks", { replace: true });
        } catch (error) {
            const msg =
                typeof error?.response?.data === "string"
                    ? error.response.data
                    : mode === "login"
                        ? "No se pudo iniciar sesión"
                        : "No se pudo crear la cuenta";
            setErr(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative grid place-items-center bg-white dark:bg-zinc-900 text-black dark:text-white px-4">
            {/* botón de tema reutilizado */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white px-4 py-2 rounded shadow hover:brightness-110 transition"
                >
                    {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
                </button>
            </div>

            <motion.div
                layout
                className="w-full max-w-sm rounded-2xl bg-zinc-100 dark:bg-zinc-800 shadow-xl p-6"
            >
                <motion.h2
                    key={mode}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold text-center mb-5"
                >
                    {mode === "login" ? "Sign In" : "Sign Up"}
                </motion.h2>

                <AnimatePresence mode="wait">
                    <motion.form
                        key={mode}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 24, rotateY: 6 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        exit={{ opacity: 0, x: -24, rotateY: -6 }}
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="space-y-3"
                    >
                        {mode === "register" && (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded p-2 pl-10"
                                    required
                                />
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 text-gray-500" />
                            </div>
                        )}

                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded p-2 pl-10"
                                required
                            />
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 text-gray-500" />
                        </div>

                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded p-2 pl-10 pr-12"
                                required
                            />
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 text-gray-500" />

                            <button
                                type="button"
                                onClick={() => setShowPass((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>


                        {mode === "register" && (
                            <div className="relative">
                                <input
                                    type={showPass2 ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded p-2 pl-10 pr-12"
                                    required
                                />
                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 text-gray-500" />

                                <button
                                    type="button"
                                    onClick={() => setShowPass2((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
                                >
                                    {showPass2 ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                        )}

                        {err && <p className="text-red-500 text-sm">{err}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:brightness-110 disabled:opacity-60"
                        >
                            {loading
                                ? "Procesando…"
                                : mode === "login"
                                    ? "Login"
                                    : "Create Account"}
                        </button>
                    </motion.form>
                </AnimatePresence>

                <div className="text-center text-sm mt-4">
                    {mode === "login" ? (
                        <>
                            <span className="opacity-80">Don't have an account?</span>{" "}
                            <button
                                onClick={toggleMode}
                                className="underline underline-offset-4 hover:opacity-80"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="opacity-80">Already have an account?</span>{" "}
                            <button
                                onClick={toggleMode}
                                className="underline underline-offset-4 hover:opacity-80"
                            >
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
