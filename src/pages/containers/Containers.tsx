import ContainerCard from "@/components/container-card/ContainerCard";
import { iniciarContainer, listarContainers, pararContainer, removerContainer } from "@/services/HomeService";
import { Skeleton } from "@/components/ui/skeleton"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerProps } from "@/components/interfaces/ContainerProps";
import { CircleFadingArrowUpIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Containers() {
    const [containers, setContainers] = useState<ContainerProps[]>([]);
    const [loadingContainers, setLoadingContainers] = useState<string[]>([]);
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);

    const skeleton = (<div className="flex items-center"><Skeleton className="h-33 w-135" /></div>)
    const ready = (<CircleFadingArrowUpIcon />)
    const loading = (<div className="flex items-center gap-6"><Spinner className="size-6" /></div>)

    useEffect(() => { listarContainers().then(setContainers).finally(() => { setLoadingSkeleton(false); }) }, []);

    return (
        loadingSkeleton ? (<div className="container-grid">{skeleton}{skeleton}{skeleton}{skeleton}{skeleton}</div>) :
            (
                <>
                    <div className="titles"><h1>Containers </h1></div>
                    <div className="container-grid">
                        {containers.map((c: any) => (
                            <ContainerCard
                                key={c.ID}
                                ID={c.ID}
                                nome={c.Names}
                                imagem={c.Image}
                                status={c.Status}
                                onStart={handleStart}
                                onStop={handleStop}
                                onRemove={handleRemove}
                                children={loadingContainers.includes(c.ID)
                                    ? loading
                                    : ready
                                }
                            />
                        ))}
                    </div>
                </>
            )
    );

    function setContainerLoading(id: string, loading: boolean) {
        setLoadingContainers((prev) => {
            if (loading) {
                return [...prev, id];
            }
            return prev.filter((containerId) => containerId !== id);
        });
    }

    async function handleRemove(id: string) {
        try {
            setContainerLoading(id, true);
            const response = await removerContainer(id);
            if (response.result) {
                console.log(response.descript);
                setContainers((containers) =>
                    containers.filter((container) => container.ID !== id)
                );
            }
            setContainerLoading(id, false);
            console.log(response.descript);

        } catch (error) {
            console.error("Erro ao remover container:", error);
        }
    }

    async function handleStop(id: string) {
        try {
            setContainerLoading(id, true);
            await pararContainer(id);
            const containersAtualizados = await listarContainers();
            setContainers(containersAtualizados);
            setContainerLoading(id, false);
        } catch (error) {
            console.error("Erro ao parar container:", error);
        }
    }

    async function handleStart(id: string) {
        try {
            setContainerLoading(id, true);

            console.log("1 - inicinando:", id);
            await iniciarContainer(id);
            console.log("2 - container iniciado");
            const containersAtualizados = await listarContainers();
            console.log("3 - containers recebidos:", containersAtualizados);
            setContainers(containersAtualizados);
            console.log("4 - estado atualizado");
            setContainerLoading(id, false);


        } catch (error) {
            console.error("Erro ao iniciar container:", error);
        }
    }



}


