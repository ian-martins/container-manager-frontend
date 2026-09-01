import { Connection } from "@/components/interfaces/Connection";
import { api } from "./api";

export async function listarConnection(): Promise<Connection[]> {
    const response = await api("/connection/list")
    if (!response.ok) throw new Error("Erro ao listar connection");
    return await response.json();
}

export async function newConnection(conn: Connection) {
    const response = await api(`/connection/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(conn)
    });

    return await response.json();
}

interface activeconn {
    id: string;
}
export async function activeconn(id: string): Promise<string> {

    const response = await api(`/user/activeconn`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id,} satisfies activeconn),}
    );

    if (!response.ok) {
        throw new Error("erro");
    }

    return await response.text();

}