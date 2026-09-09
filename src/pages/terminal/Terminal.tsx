import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useNavigate } from "react-router-dom";

function Terminal() {
    const navigate = useNavigate();
    return (
        <div className="space-y-8">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Docker Prompt</CardTitle>
                    <CardDescription>
                        Execute comandos Docker neste host.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">

                    {/* Entrada do comando */}
                    <div className="flex gap-2">
                        <Textarea placeholder="docker ps" className="font-mono" />
                        <Button>
                            Executar
                        </Button>
                    </div>

                    <Separator />

                    {/* Saída */}
                    <div>
                        <p className="mb-2 text-sm font-medium">
                            Saída
                        </p>

                        <ScrollArea className="h-[300px] rounded-md border bg-black p-4">
                            <pre className="font-mono text-sm text-green-400">
                                CONTAINER ID   IMAGE          STATUS
                                8a32f1...       nginx:latest  Up 2 hours
                            </pre>
                        </ScrollArea>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

export default Terminal;
