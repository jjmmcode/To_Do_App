import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("joel@example.com");
    const [password, setPassword] = useState("123456");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            const { token } = res.data;

            // Guarda el token en localStorage
            localStorage.setItem("token", token);

            alert("Login exitoso!");
            // Aquí puedes redirigir o cambiar estado
        } catch (err) {
            console.error(err);
            alert("Login fallido. Revisa tu email o contraseña.");
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="border p-2 w-full"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="border p-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Iniciar sesión
            </button>
        </form>
    );
}

export default Login;
