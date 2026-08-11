import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"

import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (

        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </ThemeProvider>

    );
}