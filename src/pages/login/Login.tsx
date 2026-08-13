import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginRequest } from "../../services/Auth";
import { useAuth } from "../../context/AuthContext";
import React from "react";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleLogin(event: React.FormEvent) {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const token = await loginRequest(
                username,
                password
            );

            login(token);

            navigate("/home");

        } catch (error) {

            setError("Usuário ou senha inválidos");

        } finally {

            setLoading(false);
        }
    }

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                />

                {error && (
                    <p>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

            </form>

        </div>
    );
}