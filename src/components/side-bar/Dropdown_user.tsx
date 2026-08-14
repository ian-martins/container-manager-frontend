import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Lock, LogIn, LogOutIcon, User2, } from "lucide-react"
import React, { useContext } from "react"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"


export function Dropdown_user() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
   
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" />}>
                <User2 /> Username
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    {isAuthenticated ? (
                        <DropdownMenuItem variant="destructive" onClick={() => {logout(); navigate("/home")}}><LogOutIcon />Log out</DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem variant="default" onClick={() => navigate("/auth/login")}><LogIn /> Login</DropdownMenuItem>
                    
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
