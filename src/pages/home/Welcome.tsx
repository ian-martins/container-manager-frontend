import { ArrowRight, Container, Database, Server, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import React from "react";

export function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="flex min-h-[70vh] items-center justify-center px-6">
                <div className="mx-auto max-w-4xl text-center">

                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                            <Container className="h-9 w-9 text-primary" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Gerencie seus containers
                        <span className="block text-primary">
                            de forma simples.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        Uma interface web para criar, executar, visualizar e
                        gerenciar seus containers Docker em um único lugar.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            size="lg"
                            onClick={() => navigate("/home")}
                        >
                            Ver Containers
                            <ArrowRight />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate("/containers/create")}
                        >
                            Criar Container
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="border-t bg-muted/30 px-6 py-20">
                <div className="mx-auto max-w-6xl">

                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold">
                            Tudo em um só lugar
                        </h2>

                        <p className="mt-3 text-muted-foreground">
                            Controle seus containers através de uma interface
                            simples e intuitiva.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        <Card>
                            <CardContent className="p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Container className="h-6 w-6 text-primary" />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Containers
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Crie, inicie, pare e remova containers
                                    diretamente pela interface.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Database className="h-6 w-6 text-primary" />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Imagens
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Visualize e gerencie as imagens disponíveis
                                    no seu ambiente Docker.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Terminal className="h-6 w-6 text-primary" />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Controle
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Acompanhe o estado dos seus containers e
                                    execute operações rapidamente.
                                </p>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-3xl text-center">

                    <Server className="mx-auto mb-5 h-10 w-10 text-primary" />

                    <h2 className="text-3xl font-bold">
                        Pronto para começar?
                    </h2>

                    <p className="mt-3 text-muted-foreground">
                        Acesse seus containers e comece a gerenciar seu
                        ambiente Docker.
                    </p>

                    <Button
                        className="mt-6"
                        size="lg"
                        onClick={() => navigate("/home")}
                    >
                        Abrir Dashboard
                        <ArrowRight />
                    </Button>

                </div>
            </section>
        </div>
    );
}