import React from "react";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Database,
    HardDrive,
    Image,
    Network,
    Plus,
    Download,
    ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

function Home() {

    const navigate = useNavigate();

    const cards = [
        {
            title: "Containers",
            description: "Listar, iniciar, parar e remover containers.",
            icon: Container,
            path: "/home/containers",
        },
        {
            title: "Novo Container",
            description: "Criar um novo container Docker.",
            icon: Plus,
            path: "/home/container/create",
        },
        {
            title: "Imagens",
            description: "Visualizar e gerenciar imagens Docker.",
            icon: Image,
            path: "/home/images",
        },
        {
            title: "Baixar Imagem",
            description: "Realizar pull de uma imagem do Docker Hub.",
            icon: Download,
            path: "/home/image/pull",
        },
        {
            title: "Volumes",
            description: "Gerenciar volumes utilizados pelos containers.",
            icon: HardDrive,
            path: "/home/volumes",
        },
        {
            title: "Networks",
            description: "Gerenciar redes Docker.",
            icon: Network,
            path: "/home",
        },
    ];

    return (
        <div className="space-y-8">

            {/* Cabeçalho */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Gerencie seus containers, imagens, volumes e redes Docker.
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {cards.map((card) => {

                    const Icon = card.icon;

                    return (
                        <Card
                            key={card.title}
                            className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md"
                            onClick={() => navigate(card.path)}
                        >
                            <CardContent className="p-6">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>

                                    <ArrowRight
                                        className="
                                            h-5 w-5
                                            text-muted-foreground
                                            transition-transform
                                            group-hover:translate-x-1
                                        "
                                    />

                                </div>

                                <div className="mt-5">

                                    <h2 className="text-xl font-semibold">
                                        {card.title}
                                    </h2>

                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {card.description}
                                    </p>

                                </div>

                            </CardContent>
                        </Card>
                    );
                })}

            </div>

            {/* Área de destaque */}
            <Card className="overflow-hidden">
                <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <Database className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <h2 className="font-semibold">
                                Ambiente Docker
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Gerencie todos os recursos do seu ambiente
                                através do painel.
                            </p>
                        </div>

                    </div>

                    <button
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        onClick={() => navigate("/home/containers")}
                    >
                        Ver containers
                        <ArrowRight className="h-4 w-4" />
                    </button>

                </CardContent>
            </Card>

        </div>
    );
}

export default Home;