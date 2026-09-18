import React, { useState } from "react";
import { criarContainer } from "../../services/HomeService";
import { Field, FieldDescription, FieldLabel, } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ContainerCreate from "@/components/interfaces/ContainerCreate";
import { Navigate, useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Environment { key: string; value: string; }
interface Port { host: string; container: string; }

interface ContainerForm {
    detached: boolean;
    interactive: boolean;
    remove: boolean;
    tty: boolean;

    name: string;
    cpus: string;
    memory: string;
    timeout: string;
    signal: string;
    environments: Environment[];
    ports: Port[];
    volumes: string[];
    mounts: string[];
    image: string;
}

export default function NewContainers() {

    const [container, setContainer] = useState<ContainerForm>({
        detached: true,
        interactive: false,
        remove: false,
        tty: true,

        name: "",
        cpus: "",
        memory: "",
        timeout: "",
        signal: "",

        environments: [],
        ports: [],
        volumes: [],
        mounts: [],

        image: "",
    });

    const [salvarComando, setSalvarComando] = useState(false);

    const navigate = useNavigate();
    const [environmentKey, setEnvironmentKey] = useState("");
    const [environmentValue, setEnvironmentValue] = useState("");

    const [portHost, setPortHost] = useState("");
    const [portContainer, setPortContainer] = useState("");

    const [volumeInput, setVolumeInput] = useState("");
    const [mountInput, setMountInput] = useState("");

    function updateField<K extends keyof ContainerForm>(
        field: K,
        value: ContainerForm[K]
    ) {
        setContainer(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    // =========================
    // ENVIRONMENT
    // =========================

    function addEnvironment() {

        if (!environmentKey.trim()) {
            return;
        }

        const environment: Environment = {
            key: environmentKey.trim(),
            value: environmentValue,
        };

        setContainer(prev => ({
            ...prev,
            environments: [
                ...prev.environments,
                environment,
            ],
        }));

        setEnvironmentKey("");
        setEnvironmentValue("");
    }

    function removeEnvironment(index: number) {

        setContainer(prev => ({
            ...prev,
            environments: prev.environments.filter(
                (_, i) => i !== index
            ),
        }));
    }

    // =========================
    // PORTS
    // =========================

    function addPort() {

        if (!portHost.trim() || !portContainer.trim()) {
            return;
        }

        const port: Port = {
            host: portHost.trim(),
            container: portContainer.trim(),
        };

        setContainer(prev => ({
            ...prev,
            ports: [
                ...prev.ports,
                port,
            ],
        }));

        setPortHost("");
        setPortContainer("");
    }

    function removePort(index: number) {

        setContainer(prev => ({
            ...prev,
            ports: prev.ports.filter(
                (_, i) => i !== index
            ),
        }));
    }

    // =========================
    // VOLUMES
    // =========================

    function addVolume() {

        if (!volumeInput.trim()) {
            return;
        }

        setContainer(prev => ({
            ...prev,
            volumes: [
                ...prev.volumes,
                volumeInput.trim(),
            ],
        }));

        setVolumeInput("");
    }

    function removeVolume(index: number) {

        setContainer(prev => ({
            ...prev,
            volumes: prev.volumes.filter(
                (_, i) => i !== index
            ),
        }));
    }

    // =========================
    // MOUNTS
    // =========================

    function addMount() {

        if (!mountInput.trim()) {
            return;
        }

        setContainer(prev => ({
            ...prev,
            mounts: [
                ...prev.mounts,
                mountInput.trim(),
            ],
        }));

        setMountInput("");
    }

    function removeMount(index: number) {

        setContainer(prev => ({
            ...prev,
            mounts: prev.mounts.filter(
                (_, i) => i !== index
            ),
        }));
    }

    // =========================
    // SUBMIT
    // =========================

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const payload: ContainerCreate = {
            detached: container.detached,
            interactive: container.interactive,
            remove: container.remove,
            tty: container.tty,
            save: salvarComando,

            name: container.name,
            cpus: container.cpus,
            memory: container.memory,
            timeout: container.timeout,
            signal: container.signal,

            environments: container.environments.map(
                env => `${env.key}=${env.value}`
            ),

            ports: container.ports.map(
                port => `${port.host}:${port.container}`
            ),

            volumes: container.volumes,
            mounts: container.mounts,

            image: container.image,
        };

        try {
            const response = await criarContainer(payload);
            console.log(response.text);
        } catch (error) {
            console.error("Erro ao criar container:", error);
        }
    }

    return (
        <>
            <div className="titles mb-6">
                <h1>Criar Container</h1>
            </div>
            <Tabs defaultValue="overview" className="w-[600px]">
                <TabsList variant="line">
                    <TabsTrigger value="O">Formulario</TabsTrigger>
                    <TabsTrigger value="L">Lista</TabsTrigger>
                </TabsList>
                <TabsContent value="O">
                    <div className="w-full max-w-4xl">


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* ======================================
                    CONFIGURAÇÃO PRINCIPAL
                ====================================== */}

                            <div className="rounded-lg border p-6 space-y-6">

                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Configuração
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Configurações básicas do container.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <Field>
                                        <FieldLabel htmlFor="name">
                                            Nome
                                        </FieldLabel>

                                        <Input
                                            id="name"
                                            value={container.name}
                                            onChange={(e) =>
                                                updateField(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="meu-postgres"
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="image">
                                            Imagem
                                        </FieldLabel>

                                        <Input
                                            id="image"
                                            value={container.image}
                                            onChange={(e) =>
                                                updateField(
                                                    "image",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="postgres:16"
                                            required
                                        />

                                        <FieldDescription>
                                            Exemplo: postgres:16, nginx:latest
                                        </FieldDescription>
                                    </Field>

                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="detached"
                                            checked={container.detached}
                                            onCheckedChange={(value) =>
                                                updateField(
                                                    "detached",
                                                    value === true
                                                )
                                            }
                                        />

                                        <FieldLabel htmlFor="detached">
                                            Detached
                                        </FieldLabel>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="interactive"
                                            checked={container.interactive}
                                            onCheckedChange={(value) =>
                                                updateField(
                                                    "interactive",
                                                    value === true
                                                )
                                            }
                                        />

                                        <FieldLabel htmlFor="interactive">
                                            Interactive
                                        </FieldLabel>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="tty"
                                            checked={container.tty}
                                            onCheckedChange={(value) =>
                                                updateField(
                                                    "tty",
                                                    value === true
                                                )
                                            }
                                        />

                                        <FieldLabel htmlFor="tty">
                                            TTY
                                        </FieldLabel>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="remove"
                                            checked={container.remove}
                                            onCheckedChange={(value) =>
                                                updateField(
                                                    "remove",
                                                    value === true
                                                )
                                            }
                                        />

                                        <FieldLabel htmlFor="remove">
                                            Remove
                                        </FieldLabel>
                                    </div>

                                </div>

                            </div>


                            {/* ======================================
                    TABS
                ====================================== */}

                            <Tabs defaultValue="resources">

                                <TabsList variant="line">

                                    <TabsTrigger value="resources">
                                        Recursos
                                    </TabsTrigger>

                                    <TabsTrigger value="environment">
                                        Ambiente
                                    </TabsTrigger>

                                    <TabsTrigger value="ports">
                                        Portas
                                    </TabsTrigger>

                                    <TabsTrigger value="volumes">
                                        Volumes
                                    </TabsTrigger>

                                </TabsList>


                                {/* ==================================
                        RECURSOS
                    ================================== */}

                                <TabsContent
                                    value="resources"
                                    className="pt-6"
                                >

                                    <div className="rounded-lg border p-6">

                                        <div className="mb-6">
                                            <h2 className="text-lg font-semibold">
                                                Recursos
                                            </h2>

                                            <p className="text-sm text-muted-foreground">
                                                Limites e configurações de execução.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            <Field>
                                                <FieldLabel>
                                                    CPUs
                                                </FieldLabel>

                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    value={container.cpus}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "cpus",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="2"
                                                />

                                                <FieldDescription>
                                                    Exemplo: 0.5, 1, 2
                                                </FieldDescription>
                                            </Field>

                                            <Field>
                                                <FieldLabel>
                                                    Memória
                                                </FieldLabel>

                                                <Input
                                                    value={container.memory}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "memory",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="1g"
                                                />

                                                <FieldDescription>
                                                    Exemplo: 512m, 1g, 2g
                                                </FieldDescription>
                                            </Field>

                                            <Field>
                                                <FieldLabel>
                                                    Timeout
                                                </FieldLabel>

                                                <Input
                                                    value={container.timeout}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "timeout",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="30"
                                                />
                                            </Field>

                                            <Field>
                                                <FieldLabel>
                                                    Signal
                                                </FieldLabel>

                                                <Input
                                                    value={container.signal}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "signal",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="SIGTERM"
                                                />
                                            </Field>

                                        </div>

                                    </div>

                                </TabsContent>


                                {/* ==================================
                        AMBIENTE
                    ================================== */}

                                <TabsContent
                                    value="environment"
                                    className="pt-6"
                                >

                                    <div className="rounded-lg border p-6">

                                        <div className="mb-6">
                                            <h2 className="text-lg font-semibold">
                                                Variáveis de ambiente
                                            </h2>

                                            <p className="text-sm text-muted-foreground">
                                                Equivalente ao parâmetro
                                                {" "}
                                                <code>-e</code>
                                                {" "}
                                                do Docker.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">

                                            <Input
                                                value={environmentKey}
                                                onChange={(e) =>
                                                    setEnvironmentKey(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="POSTGRES_USER"
                                            />

                                            <Input
                                                value={environmentValue}
                                                onChange={(e) =>
                                                    setEnvironmentValue(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="postgres"
                                            />

                                            <Button
                                                type="button"
                                                onClick={addEnvironment}
                                            >
                                                Adicionar
                                            </Button>

                                        </div>

                                        <div className="mt-6 space-y-2">

                                            {container.environments.map(
                                                (env, index) => (

                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between rounded-md border p-3"
                                                    >

                                                        <span className="font-mono text-sm">
                                                            {env.key}={env.value}
                                                        </span>

                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeEnvironment(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Remover
                                                        </Button>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                </TabsContent>


                                {/* ==================================
                        PORTAS
                    ================================== */}

                                <TabsContent
                                    value="ports"
                                    className="pt-6"
                                >

                                    <div className="rounded-lg border p-6">

                                        <div className="mb-6">
                                            <h2 className="text-lg font-semibold">
                                                Portas
                                            </h2>

                                            <p className="text-sm text-muted-foreground">
                                                Equivalente ao parâmetro
                                                {" "}
                                                <code>-p</code>
                                                {" "}
                                                do Docker.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-[1fr_auto_1fr_auto] items-end gap-3">

                                            <Field>
                                                <FieldLabel>
                                                    Porta do host
                                                </FieldLabel>

                                                <Input
                                                    value={portHost}
                                                    onChange={(e) =>
                                                        setPortHost(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="5432"
                                                />
                                            </Field>

                                            <span className="pb-2 text-muted-foreground">
                                                →
                                            </span>

                                            <Field>
                                                <FieldLabel>
                                                    Porta do container
                                                </FieldLabel>

                                                <Input
                                                    value={portContainer}
                                                    onChange={(e) =>
                                                        setPortContainer(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="5432"
                                                />
                                            </Field>

                                            <Button
                                                type="button"
                                                onClick={addPort}
                                            >
                                                Adicionar
                                            </Button>

                                        </div>

                                        <div className="mt-6 space-y-2">

                                            {container.ports.map(
                                                (port, index) => (

                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between rounded-md border p-3"
                                                    >

                                                        <span className="font-mono text-sm">
                                                            {port.host}
                                                            {" → "}
                                                            {port.container}
                                                        </span>

                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                removePort(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Remover
                                                        </Button>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                </TabsContent>


                                {/* ==================================
                        VOLUMES
                    ================================== */}

                                <TabsContent
                                    value="volumes"
                                    className="pt-6"
                                >

                                    <div className="rounded-lg border p-6 space-y-8">

                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                Volumes
                                            </h2>

                                            <p className="text-sm text-muted-foreground">
                                                Configuração de volumes e mounts.
                                            </p>
                                        </div>


                                        {/* VOLUMES */}

                                        <div>

                                            <Field>
                                                <FieldLabel>
                                                    Volume
                                                </FieldLabel>

                                                <div className="flex gap-3">

                                                    <Input
                                                        value={volumeInput}
                                                        onChange={(e) =>
                                                            setVolumeInput(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="postgres-data"
                                                    />

                                                    <Button
                                                        type="button"
                                                        onClick={addVolume}
                                                    >
                                                        Adicionar
                                                    </Button>

                                                </div>
                                            </Field>

                                            <div className="mt-4 space-y-2">

                                                {container.volumes.map(
                                                    (volume, index) => (

                                                        <div
                                                            key={index}
                                                            className="flex justify-between items-center rounded-md border p-3"
                                                        >

                                                            <span className="font-mono text-sm">
                                                                {volume}
                                                            </span>

                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() =>
                                                                    removeVolume(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                Remover
                                                            </Button>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>


                                        {/* MOUNTS */}

                                        <div>

                                            <Field>
                                                <FieldLabel>
                                                    Mount
                                                </FieldLabel>

                                                <div className="flex gap-3">

                                                    <Input
                                                        value={mountInput}
                                                        onChange={(e) =>
                                                            setMountInput(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="/host/path:/container/path"
                                                    />

                                                    <Button
                                                        type="button"
                                                        onClick={addMount}
                                                    >
                                                        Adicionar
                                                    </Button>

                                                </div>
                                            </Field>

                                            <div className="mt-4 space-y-2">

                                                {container.mounts.map(
                                                    (mount, index) => (

                                                        <div
                                                            key={index}
                                                            className="flex justify-between items-center rounded-md border p-3"
                                                        >

                                                            <span className="font-mono text-sm">
                                                                {mount}
                                                            </span>

                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() =>
                                                                    removeMount(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                Remover
                                                            </Button>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </TabsContent>

                            </Tabs>


                            {/* ======================================
                    COMANDO
                ====================================== */}

                            <div className="rounded-lg border bg-muted/30 p-6">

                                <h2 className="text-lg font-semibold mb-3">
                                    Comando Docker
                                </h2>

                                <code className="block rounded-md bg-black p-4 text-sm text-white overflow-x-auto">
                                    docker run
                                    {" "}
                                    {container.detached && "-d "}
                                    {container.interactive && "-i "}
                                    {container.tty && "-t "}
                                    {container.remove && "--rm "}
                                    {container.name && `--name ${container.name} `}
                                    {container.ports.map(port => `-p ${port.host}:${port.container} `)}
                                    {container.environments.map(env => `-e ${env.key}=${env.value} `)}
                                    {container.volumes.map(volume => `-v ${volume} `)}
                                    {container.image || "IMAGE"}
                                </code>
                                <br />
                                <div className="flex items-center space-x-2">
                                    <Switch id="save"
                                        checked={salvarComando}
                                        onCheckedChange={setSalvarComando} />
                                    <Label htmlFor="save">salvar</Label>
                                </div>
                            </div>


                            {/* ======================================
                    SUBMIT
                ====================================== */}

                            <div className="flex justify-end gap-3">

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setContainer({
                                            detached: true, interactive: false, remove: false, tty: true,
                                            name: "", cpus: "", memory: "", timeout: "", signal: "",
                                            environments: [], ports: [], volumes: [], mounts: [],
                                            image: "",
                                        });
                                    }}>
                                    Limpar
                                </Button>

                                <Button type="submit">
                                    Criar container
                                </Button>

                            </div>

                        </form>

                    </div>
                </TabsContent>
                <TabsContent value="L">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>sequencia</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Comando</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>

        </>
    );
}
