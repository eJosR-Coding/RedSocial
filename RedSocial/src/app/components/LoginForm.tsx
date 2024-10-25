"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
  
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            console.log("Datos de la respuesta del backend:", data); // <-- Log para verificar respuesta
  
            if (data.success) {
                localStorage.setItem("userId", data.data.userId); // Cambiado a data.data.userId
                console.log("User ID guardado en localStorage:", data.data.userId); // Verifica el userId
                router.push("/profile"); // Redirigir al perfil
            } else {
                console.error(data.message);
            }
          
        } catch (error) {
            console.error("Error en el login:", error);
        }
    };
  
    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
}
