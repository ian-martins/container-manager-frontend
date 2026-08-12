import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Separator } from "./ui/separator"
import { Input } from "./ui/input"
import { CircleFadingArrowUpIcon, Settings, Settings2, User2 } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import React from "react"
import { IndentBackground } from "node_modules/@base-ui/react/drawer/index.parts.mjs"

export function AppSidebar() {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()
    const config = (<div style={{"width": "100vw","display": "flex","gap": "12px", "margin": "5px 5px"}}><Settings /><p>     Configurações</p></div>)
    return (
        <Sidebar variant="floating" >
            <SidebarHeader>
                <SidebarMenu><SidebarMenuItem></SidebarMenuItem></SidebarMenu>
            </SidebarHeader>
            <Separator></Separator>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <DropdownMenu>
                                    <DropdownMenuTrigger render={config}>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>Conexões</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
            <Separator></Separator>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="ghost" />}>
                                    <User2 /> Username
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarFooter>
        </Sidebar>


    )
}

/*<Button variant="default" size="default"><CircleFadingArrowUpIcon /></Button>*/