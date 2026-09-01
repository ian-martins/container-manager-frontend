import React, { useEffect, useState } from "react"
import { Field, FieldGroup, FieldLabel, FieldSet, } from "../../components/ui/field"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../components/ui/dropdown-menu"
import { Checkbox } from "../../components/ui/checkbox"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { ArrowLeftIcon, MoreHorizontalIcon } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { listarConnection, newConnection, activeconn } from "@/services/ConnectionsService";
import { Connection } from "@/components/interfaces/Connection"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CadastrarConnection() {
    const navigate = useNavigate();
    const [connections, setConnection] = useState<Connection[]>([]);

    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [port, setPort] = useState("");
    const [wsl, setWsl] = useState(false);

    useEffect(() => {
        carregarConnections();
    }, []);

    async function carregarConnections() {
        try {
console.log("ola")
            const data = await listarConnection();
            console.log("Connections recebidas:", data);

            setConnection(data);
        } catch (error) {
            console.error("Erro ao carregar connections:", error);
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            await newConnection({
                name,
                host,
                port,
                wsl,
            });

            navigate("/home");
        } catch (error) {
            console.error("Erro ao criar conexão:", error);
        }
    }

    function actions(connection: Connection) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                        >
                            <MoreHorizontalIcon />
                            <span className="sr-only">
                                Abrir menu
                            </span>
                        </Button>
                    }
                />

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleActive(connection)}>
                        Conectar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(connection)}>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(connection)}
                    >
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    function handleEdit(connection: Connection) {

        console.log("Editar:", connection);
    }

    async function handleActive(connection: Connection) {
        try {
            console.log("ativar:", connection);
            await activeconn(connection.id);
            console.log("Carregando novos conn's",);
            await carregarConnections();

        } catch (error) {
            console.error(
                "Erro ao ativar:",
                error
            )
        }
    }

    function handleDelete(connection: Connection) {
        console.log("Excluir:", connection);
    }

    const novaConn = (<div className="login" >
        <form onSubmit={handleSubmit}>
            <FieldSet className="w-100 max-w-lg">
                <FieldGroup>                         
                    <Field><FieldLabel>Nome</FieldLabel><Input type="text" value={name}                       onChange={(event) => setName(event.target.value)} /></Field>
                    <Field><FieldLabel>Host</FieldLabel><Input type="text" value={host}                       onChange={(event) => setHost(event.target.value)} /></Field>
                    <Field><FieldLabel>Port</FieldLabel><Input type="number" min="0" max="65535" value={port} onChange={(event) => setPort(event.target.value)}
                        className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"/></Field>
                    <Field orientation="horizontal">
                        <Checkbox id="wsl" checked={wsl} onCheckedChange={(checked) => setWsl(checked === true)} />
                        <FieldLabel htmlFor="wsl">
                            WSL
                        </FieldLabel>
                    </Field>
                    <Button variant="default" size="default" type="submit" >Conectar</Button>
                </FieldGroup>
            </FieldSet>
        </form>
    </div>
    )

    return (
        <>
            <Tabs defaultValue="overview" className="w-[600px]">
                <TabsList variant="line">
                    <TabsTrigger value="overview">Conexões</TabsTrigger>
                    <TabsTrigger value="adicionar">Adicionar</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">

                    <div className="conn_principal">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Host</TableHead>
                                    <TableHead>Porta</TableHead>
                                    <TableHead>WSL</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {connections.map((connection) => (
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
                                            )}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            {actions(connection)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
                <TabsContent value="adicionar">{novaConn}</TabsContent>
            </Tabs>
        </>

    );
}