import ContainerCard from "@/components/container-card/ContainerCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Images() {
    const navigate = useNavigate();
    return (
        <div className="container-grid">

            <ContainerCard ID="1" imagem="postgre:16" nome="Teste" status="up" onRemove={function (id: string): void {
                throw new Error("Function not implemented.");
            }} onStart={function (id: string): void {
                throw new Error("Function not implemented.");
            }}
                onStop={function (id: string): void {
                    throw new Error("Function not implemented.");
                }}>
            </ContainerCard>

        </div>
    );
}
