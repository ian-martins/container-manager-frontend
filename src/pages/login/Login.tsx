import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "../../components/ui/field"
import React, { useState } from "react"
import { Input } from "../../components/ui/input"
import { CircleFadingArrowUpIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { login as loginRequest } from "../../services/Auth";
import { Separator } from "@/components/ui/separator"


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
        <main>
            <div className="container-grid">

                <div className="login" >
                    <form onSubmit={handleLogin}>
                        <FieldSet className="w-100 max-w-lg">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="username">Login</FieldLabel>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Usuário"
                                        value={username}
                                        onChange={(event) =>
                                            setUsername(event.target.value)
                                        } />
                                    <FieldDescription>
                                        Choose a unique username for your account.
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <FieldDescription>
                                        Must be at least 8 characters long.
                                    </FieldDescription>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />{error && (
                                        <p>{error}</p>
                                    )}
                                    <Button
                                        variant="default"
                                        size="default"
                                        type="submit"
                                        disabled={loading}
                                    ><CircleFadingArrowUpIcon />{loading ? "Entrando..." : "Entrar"}</Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </form>
                </div>

                
            </div >
        </main>
    );
}