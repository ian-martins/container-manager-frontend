const API_URL = "http://localhost:9000";

interface LoginRequest {
    username: string;
    password: string;
}

export async function login(
    username: string,
    password: string
): Promise<string> {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        } satisfies LoginRequest),
    });

    if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
    }

    return await response.text();
}