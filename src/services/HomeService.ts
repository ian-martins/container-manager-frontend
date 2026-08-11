import { ContainerProps } from "@/components/interfaces/ContainerProps";
import type { ContainerCreate } from "../components/interfaces/ContainerCreate";

const URL = "http://localhost:9000/home";

export async function listarContainers(): Promise<ContainerProps[]>  {
    const response = await fetch(`${URL}/container`);
    if (!response.ok) throw new Error("Erro ao listar containers");
    return await response.json();
}

export async function iniciarContainer(id: string) {
    const response = await fetch(`${URL}/start/${id}`);
    return await response.json();
}

export async function pararContainer(id: string) {
    const response = await fetch(`${URL}/stop/${id}`);
    return await response.json();

}

export async function removerContainer(id: string) {
    const response = await fetch(`${URL}/remove/${id}`, {
        method: "DELETE"
    });
 
    return await response.json();
    
}

export async function criarContainer(command: ContainerCreate) {
    const response = await fetch(`${URL}/container/run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(command)
    });

    return await response.json();
}