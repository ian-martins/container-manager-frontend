import ContainerCard from "@/components/container-card/ContainerCard";
import {
    iniciarContainer,
    listarContainers,
    pararContainer,
    removerContainer,
} from "@/services/HomeService";

import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

import React, { useEffect, useState } from "react";
import { CircleFadingArrowUpIcon } from "lucide-react";

import { ContainerProps } from "@/components/interfaces/ContainerProps";

export default function Containers() {

    const [containers, setContainers] = useState<ContainerProps[]>([]);
    const [loadingContainers, setLoadingContainers] = useState<string[]>([]);
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);

    useEffect(() => {

        async function carregarContainers() {
            try {

                const data = await listarContainers();
                setContainers(data);

            } catch (error) {

                console.error("Erro ao carregar containers:", error);

            } finally {

                setLoadingSkeleton(false);

            }
        }

        carregarContainers();

    }, []);

    function setContainerLoading(id: string, loading: boolean) {

        setLoadingContainers((prev) => {

            if (loading) {
                return prev.includes(id)
                    ? prev
                    : [...prev, id];
            }

            return prev.filter(
                (containerId) => containerId !== id
            );
        });
    }

    async function handleStart(id: string) {

        try {

            setContainerLoading(id, true);

            await iniciarContainer(id);

            const containersAtualizados =
                await listarContainers();

            setContainers(containersAtualizados);

        } catch (error) {

            console.error(
                "Erro ao iniciar container:",
                error
            );

        } finally {

            setContainerLoading(id, false);

        }
    }

    async function handleStop(id: string) {

        try {

            setContainerLoading(id, true);

            await pararContainer(id);

            const containersAtualizados =
                await listarContainers();

            setContainers(containersAtualizados);

        } catch (error) {

            console.error(
                "Erro ao parar container:",
                error
            );

        } finally {

            setContainerLoading(id, false);

        }
    }

    async function handleRemove(id: string) {

        try {

            setContainerLoading(id, true);

            const response = await removerContainer(id);

            if (response.result) {

                setContainers((prev) =>
                    prev.filter(
                        (container) => container.ID !== id
                    )
                );

                console.log(response.descript);

            }

        } catch (error) {

            console.error(
                "Erro ao remover container:",
                error
            );

        } finally {

            setContainerLoading(id, false);

        }
    }

    if (loadingSkeleton) {

        return (
            <>
                <div className="titles">
                    <h1>Containers</h1>
                </div>

                <div className="container-grid">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center"
                        >
                            <Skeleton className="h-36 w-full" />
                        </div>
                    ))}
                </div>
            </>
        );

    }

    return (
        <>
            <div className="titles">
                <h1>Containers</h1>
            </div>

            <div className="container-grid">

                {containers.map((container) => {

                    const isLoading =
                        loadingContainers.includes(container.ID);

                    return (
                        <ContainerCard
                            key={container.ID}
                            ID={container.ID}
                            nome={container.Names}
                            imagem={container.Image}
                            status={container.Status}
                            onStart={handleStart}
                            onStop={handleStop}
                            onRemove={handleRemove}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <Spinner className="size-5" />
                                </div>
                            ) : (
                                <CircleFadingArrowUpIcon />
                            )}
                        </ContainerCard>
                    );

                })}

            </div>
        </>
    );
}