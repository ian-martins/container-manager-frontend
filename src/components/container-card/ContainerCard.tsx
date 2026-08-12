import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle, } from "@/components/ui/item"
import React, { Children } from "react";
import { Button } from "../ui/button";
import { CircleFadingArrowUpIcon, Icon, Rocket, Trash2, } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ButtonGroup } from "../ui/button-group";
import { Separator } from "../ui/separator"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { ContainerProps } from "../interfaces/ContainerProps";

export default function ContainerCard({
    ID,
    nome,
    imagem,
    status,
    onStart,
    onStop,
    onRemove,
    children
}: ContainerProps) {

    return (
        <Card className="[--card-spacing:--spacing(3)]">
            <Item>
                {children}
                <ItemMedia variant="icon">
                    <Icon iconNode={[]} />
                </ItemMedia>
              
            <ItemContent>
                <ItemTitle className="text-lg">{nome}</ItemTitle>
                <ItemTitle>Imagem:<ItemDescription>{imagem}</ItemDescription></ItemTitle>
                <ItemTitle>Status:<ItemDescription>{status}</ItemDescription></ItemTitle>
                <ItemTitle>ID:<ItemDescription>{ID}</ItemDescription></ItemTitle>
            </ItemContent>

            <Separator orientation="vertical" ></Separator>
            <ItemActions>
                <ButtonGroup>
                    <Button variant={"default"} onClick={() => onStart(ID)}>Start <Rocket /></Button>
                    <Button variant={"default"} onClick={() => onStop(ID)}>Stop</Button>
                </ButtonGroup>
            </ItemActions>

            <Button variant={"destructive"} onClick={() => onRemove(ID)}>Remove <Trash2 /></Button>
        </Item>
        </Card >
    );
}
/**/