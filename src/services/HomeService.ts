import { ContainerProps } from "@/components/interfaces/ContainerProps";
import type { ContainerCreate } from "../components/interfaces/ContainerCreate";
import { api } from "./api";

export async function listarContainers(): Promise<ContainerProps[]>  {
    const response = await api("/home/container")
    if (!response.ok) throw new Error("Erro ao listar containers");
    return await response.json();
}

export async function iniciarContainer(id: string) {
    const response = await api(`/home/start/${id}`);
    return await response.json();
}

export async function pararContainer(id: string) {
    const response = await api(`/home/stop/${id}`);
    return await response.json();
    
}

export async function removerContainer(id: string) {
    const response = await api(`/home/remove/${id}`, {
        method: "DELETE"
    });
 
    return await response.json();
    
}

export async function criarContainer(command: ContainerCreate) {
    const response = await api(`home/container/run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(command)
    });

    return await response.json();
}