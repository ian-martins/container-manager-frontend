import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Usuarios() {
    const [usuario, setUsuario] = useState<Connection[]>([]);



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

                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}