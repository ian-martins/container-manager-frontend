import ContainerCard from "@/components/container-card/ContainerCard";
import { iniciarContainer, listarContainers, pararContainer, removerContainer } from "@/services/HomeService";
import { Skeleton } from "@/components/ui/skeleton"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerProps } from "@/components/interfaces/ContainerProps";

export default function Containers() {
    const [containers, setContainers] = useState<ContainerProps[]>([]);
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const skeleton = (<div className="flex items-center gap-3"><Skeleton className="h-27 w-100" /></div>)

    useEffect(() => { listarContainers().then(setContainers).finally(() => { setLoadingSkeleton(false); }) }, []);

    return (
        loadingSkeleton ? (<div className="container-grid">{skeleton}{skeleton}{skeleton}{skeleton}{skeleton}</div>) :
            (
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
                            onRemove={handleRemove} />
                    ))}
                </div>)
    );

    async function handleRemove(id: string) {
        try {
            const response = await removerContainer(id);
            if(response.result){
                console.log(response.descript);
                setContainers((containers) =>
                containers.filter((container) => container.ID !== id)
            );
            }
            console.log(response.descript);

        } catch (error) {
            console.error("Erro ao remover container:", error);
        }
    }

    async function handleStop(id: string) {
    try {
        console.log("1 - parando:", id);

        await pararContainer(id);

        console.log("2 - container parado");

        const containersAtualizados = await listarContainers();

        console.log("3 - containers recebidos:", containersAtualizados);

        setContainers(containersAtualizados);

        console.log("4 - estado atualizado");

    } catch (error) {
        console.error("Erro ao parar container:", error);
    }
}

    async function handleStart(id: string) {
        try {
            await iniciarContainer(id);
            const containersAtualizados = await listarContainers(); 
            setContainers(containersAtualizados);
        } catch (error) {
            console.error("Erro ao iniciar container:", error);
        }
    }



}

