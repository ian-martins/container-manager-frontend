const API_URL = "http://localhost:9000";

export async function api(
    endpoint: string,
    options: RequestInit = {}
) {

    const token = localStorage.getItem("token");

    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (token) {
        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    if (response.status === 403) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        throw new Error("Sessão expirada");
    }

    return response;
}