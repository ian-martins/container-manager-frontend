import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle, } from "@/components/ui/item"
import React from "react";
import { Button } from "../ui/button";
import { CircleFadingArrowUpIcon, Icon, Sheet } from "lucide-react";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ButtonGroup } from "../ui/button-group";
import { Separator } from "../ui/separator"
import {  Card,  CardAction,  CardContent,  CardDescription,  CardFooter,  CardHeader,  CardTitle,} from "@/components/ui/card"
import { ContainerProps } from "../interfaces/ContainerProps";

export default function ContainerCard({
    ID,
    nome,
    imagem,
    status,
    onStart,
    onStop,
    onRemove
}: ContainerProps) {
    return (
        <Card className="[--card-spacing:--spacing(3)]">
            <Item>
                <CircleFadingArrowUpIcon />
                <ItemMedia variant="icon">
                    <Icon iconNode={[]} />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>{nome}</ItemTitle>
                    <ItemDescription>{imagem}</ItemDescription>
                    <ItemDescription>{status}</ItemDescription>
                    <ItemDescription>{ID}</ItemDescription>
                </ItemContent>
                <Separator orientation="vertical" ></Separator>

                <ItemActions>
                    <ButtonGroup>
                        <Button variant={"default"} onClick={() => onStart(ID)}>Start</Button>
                        <Button variant={"default"} onClick={() => onStop(ID)}>Stop</Button>
                    </ButtonGroup>
                </ItemActions>
            <Button variant={"destructive"} onClick={() => onRemove(ID)}>Remove</Button>
            </Item>
        </Card>
    );
}
/**/