import { UsuariosProps } from "@/components/interfaces/UsuariosProps";
import { api } from "./api";

export async function listarUsuarios(): Promise<UsuariosProps[]> {
    const response = await api("/user/list") 
    if(!response.ok) throw new Error() 
    return await response.json() 
}