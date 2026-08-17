import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";

import {
    Container,
    LogIn,
    LogOut,
    Settings,
    User2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import React from "react";


export function AppSidebar() {

    const navigate = useNavigate();

    return (
        <Sidebar variant="floating">

            {/* Header */}
            <SidebarHeader>

                <SidebarMenu>

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            size="lg"
                            onClick={() => navigate("/home")}
                        >

                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10">
                                <Container className="size-5 text-primary" />
                            </div>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    Container Manager
                                </span>

                                <span className="truncate text-xs text-muted-foreground">
                                    Docker Management
                                </span>
                            </div>

                        </SidebarMenuButton>

                    </SidebarMenuItem>

                </SidebarMenu>

            </SidebarHeader>

            <Separator />

            {/* Content */}
            <SidebarContent>

                <SidebarGroup>

                    <SidebarMenu>

                        <SidebarMenuItem>

                            <DropdownMenu>

                                <DropdownMenuTrigger >

                                    <SidebarMenuButton>
                                        <Settings />
                                        <span>Configurações</span>
                                    </SidebarMenuButton>

                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    side="right"
                                    align="start"
                                    className="w-48"
                                >

                                    <DropdownMenuGroup>

                                        <DropdownMenuLabel>
                                            Configurações
                                        </DropdownMenuLabel>

                                        <DropdownMenuItem
                                            onClick={() =>
                                                navigate("/auth/conexao")
                                            }
                                        >
                                            <Settings />
                                            Conexões
                                        </DropdownMenuItem>

                                    </DropdownMenuGroup>

                                </DropdownMenuContent>

                            </DropdownMenu>

                        </SidebarMenuItem>

                    </SidebarMenu>

                </SidebarGroup>

            </SidebarContent>

            <Separator />

            {/* Footer */}
            <SidebarFooter>

                <SidebarMenu>

                    <SidebarMenuItem>

                        <DropdownUser />

                    </SidebarMenuItem>

                </SidebarMenu>

            </SidebarFooter>

        </Sidebar>
    );
}


function DropdownUser() {

    const {
        logout,
        isAuthenticated,
    } = useAuth();

    const navigate = useNavigate();

    function handleLogout() {

        logout();

        navigate("/auth/login");
    }

    return (

        <DropdownMenu>

            <DropdownMenuTrigger >

                <SidebarMenuButton
                    size="lg"
                    className="w-full"
                >

                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                        <User2 className="size-5" />
                    </div>

                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                            Username
                        </span>

                        <span className="truncate text-xs text-muted-foreground">
                            {isAuthenticated
                                ? "Conta conectada"
                                : "Não autenticado"
                            }
                        </span>
                    </div>

                </SidebarMenuButton>

            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="right"
                align="end"
                className="w-56"
            >

                <DropdownMenuGroup>

                    <DropdownMenuLabel>
                        Minha Conta
                    </DropdownMenuLabel>

                    {isAuthenticated ? (

                        <DropdownMenuItem
                            variant="destructive"
                            onClick={handleLogout}
                        >
                            <LogOut />
                            Sair
                        </DropdownMenuItem>

                    ) : (

                        <DropdownMenuItem
                            onClick={() =>
                                navigate("/auth/login")
                            }
                        >
                            <LogIn />
                            Entrar
                        </DropdownMenuItem>

                    )}

                </DropdownMenuGroup>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}