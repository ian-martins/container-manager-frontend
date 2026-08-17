import React, { useState } from "react";
import {
    Container,
    CircleFadingArrowUpIcon,
    Eye,
    EyeOff,
} from "lucide-react";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "../../components/ui/field";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { login as loginRequest } from "../../services/Auth";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(event: React.FormEvent) {

        event.preventDefault();

        if (!username || !password) {
            setError("Preencha o usuário e a senha.");
            return;
        }

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

            setError("Usuário ou senha inválidos.");

        } finally {

            setLoading(false);

        }
    }

    return (
        <main className="min-h-screen bg-background flex">

            {/* Lado esquerdo */}
            <section className="hidden lg:flex lg:w-1/2 bg-muted/30 items-center justify-center border-r">

                <div className="max-w-md px-10">

                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Container className="h-7 w-7 text-primary" />
                        </div>

                        <span className="text-2xl font-bold">
                            Container Manager
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Gerencie seus containers
                        <span className="block text-primary">
                            de forma simples.
                        </span>
                    </h1>

                    <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                        Controle seus containers Docker, imagens e recursos
                        através de uma interface moderna e intuitiva.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4">

                        <div className="rounded-xl border bg-background p-4">
                            <p className="text-2xl font-bold">Docker</p>
                            <p className="text-sm text-muted-foreground">
                                Gerenciamento
                            </p>
                        </div>

                        <div className="rounded-xl border bg-background p-4">
                            <p className="text-2xl font-bold">Web</p>
                            <p className="text-sm text-muted-foreground">
                                Interface moderna
                            </p>
                        </div>

                    </div>
                </div>

            </section>

            {/* Formulário */}
            <section className="flex flex-1 items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    {/* Logo mobile */}
                    <div className="flex lg:hidden items-center justify-center gap-3 mb-10">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                            <Container className="h-6 w-6 text-primary" />
                        </div>

                        <span className="text-xl font-bold">
                            Container Manager
                        </span>

                    </div>

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold tracking-tight">
                            Bem-vindo de volta
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Entre na sua conta para continuar.
                        </p>

                    </div>

                    <form onSubmit={handleLogin}>

                        <FieldSet>

                            <FieldGroup>

                                {/* Usuário */}
                                <Field>

                                    <FieldLabel htmlFor="username">
                                        Usuário
                                    </FieldLabel>

                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Digite seu usuário"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                            setError("");
                                        }}
                                        disabled={loading}
                                    />

                                </Field>

                                {/* Senha */}
                                <Field>

                                    <div className="flex items-center justify-between">

                                        <FieldLabel htmlFor="password">
                                            Senha
                                        </FieldLabel>

                                        <button
                                            type="button"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                            onClick={() => {
                                                // Futuramente:
                                                // implementar recuperação de senha
                                            }}
                                        >
                                            Esqueceu a senha?
                                        </button>

                                    </div>

                                    <div className="relative">

                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Digite sua senha"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                                setError("");
                                            }}
                                            disabled={loading}
                                            className="pr-10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            aria-label={
                                                showPassword
                                                    ? "Ocultar senha"
                                                    : "Mostrar senha"
                                            }
                                        >
                                            {showPassword
                                                ? <EyeOff className="h-4 w-4" />
                                                : <Eye className="h-4 w-4" />
                                            }
                                        </button>

                                    </div>

                                </Field>

                                {/* Erro */}
                                {error && (
                                    <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2">
                                        <p className="text-sm text-destructive">
                                            {error}
                                        </p>
                                    </div>
                                )}

                                {/* Botão */}
                                <Button
                                    className="w-full"
                                    size="lg"
                                    type="submit"
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Entrando...
                                        </>
                                    ) : (
                                        <>
                                            <CircleFadingArrowUpIcon />
                                            Entrar
                                        </>
                                    )}

                                </Button>

                            </FieldGroup>

                        </FieldSet>

                    </form>

                    <p className="mt-8 text-center text-xs text-muted-foreground">
                        Container Manager • Docker Management
                    </p>

                </div>

            </section>

        </main>
    );
}
/*

### O que mudou

**1. Layout dividido**

No desktop:

```text
┌──────────────────────────┬──────────────────────────┐
│                          │                          │
│   🐳 Container Manager   │   Bem-vindo de volta     │
│                          │                          │
│   Gerencie seus          │   Usuário                │
│   containers             │   [_______________]      │
│   de forma simples       │                          │
│                          │   Senha                  │
│   Docker     Web         │   [_______________] 👁   │
│                          │                          │
│                          │   [      Entrar       ]  │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
```

**2. Campo de senha com mostrar/ocultar**

O usuário pode clicar no 👁 para visualizar a senha.

**3. Validação básica**

Agora não deixa enviar o formulário vazio:

```tsx
if (!username || !password) {
    setError("Preencha o usuário e a senha.");
    return;
}
```

**4. Erro visualmente destacado**

Em vez de simplesmente:

```tsx
<p>{error}</p>
```

o erro aparece em uma pequena caixa destacada.

**5. Loading melhor**

Enquanto o Spring está processando o login:

```text
◌ Entrando...
```

e o formulário fica desabilitado.

**6. Responsividade**

No celular o lado esquerdo desaparece:

```text
Desktop
[ apresentação ][ login ]

Mobile
[ login ]
```

Isso evita que a tela fique apertada.

### Uma observação importante

Eu também removeria estes textos que estavam no seu código:

```tsx
Choose a unique username for your account.
```

e:

```tsx
Must be at least 8 characters long.
```

Eles parecem ter vindo do exemplo dos componentes do shadcn e não correspondem ao seu sistema de login.

E no seu caso, como você está fazendo o **Container Manager**, eu usaria `Container` do Lucide no lugar do `CircleFadingArrowUpIcon` como identidade visual. O ícone de seta pode continuar no botão, mas a marca da aplicação fica mais clara com o ícone de container.
*/