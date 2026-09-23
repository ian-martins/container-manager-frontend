import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsuariosProps from "@/components/interfaces/UsuariosProps";
import { listarUsuarios } from "@/services/UsuarioService";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<UsuariosProps[]>([]);
    
    useEffect(() => {
        carregarUsuarios();
    }, [])

    async function carregarUsuarios() {
        try {
            console.log("usuarios")
            const data = await listarUsuarios();
            console.log("usuarios recebidao:", data);

            setUsuarios(data);
        } catch (error) {
            console.error("Erro ao carregar usuarios:", error);
        }
    }



    return (
        <>
            <Tabs defaultValue="overview" className="w-[600px]">
                <TabsList variant="line">
                    <TabsTrigger value="overview">Usuarios</TabsTrigger>
                    <TabsTrigger value="adicionar">Adicionar</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="conn_principal">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Usuario</TableHead>
                                    <TableHead>Conexão</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usuarios.map((usuario) => (
                                    <TableRow key={usuario.id}>
                                        <TableCell className="font-medium">{usuario.username}</TableCell>
                                        <TableCell className="font-medium">{usuario.hostName}</TableCell>
                                        <TableCell className="font-medium">{usuario.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}/*
usuarios.map((connection) => (
                                                                    <TableRow key={connection.id}
                                                                        className={connection.active ? "bg-green-50 dark:bg-purple-950/30 border-l-4 border-l-purple-500" : ""}>
                                                                        <TableCell className="font-medium">{connection.name}</TableCell>
                                                                        <TableCell>{connection.host}</TableCell>
                                                                        <TableCell>{connection.port}</TableCell>
                                                                        <TableCell>{connection.wsl ? "Sim" : "Não"}</TableCell>
                                                                        <TableCell>
                                                                            {connection.active ? (
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="size-2 rounded-full bg-purple-500" />
                                                                                    <span className="font-medium text-purple-600">
                                                                                        Ativo
                                                                                    </span>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="size-2 rounded-full bg-gray-400" />
                                                                                    <span className="text-muted-foreground">
                                                                                        Inativo
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                                 */