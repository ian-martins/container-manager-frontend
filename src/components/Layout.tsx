import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet, useLocation } from "react-router-dom";
import React from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "./ui/breadcrumb";

export default function Layout() {
    const location = useLocation();
    const paths = location.pathname
        .split("/")
        .filter(Boolean);

    const breadcrumb = (
        <Breadcrumb className="breadcrumb_style"><BreadcrumbList>
            {paths.map((path, index) => {
                const isLast = index === paths.length - 1;
                const href = "/" + paths.slice(0, index + 1).join("/");
                return (<React.Fragment key={href}><BreadcrumbItem>{isLast ? (<BreadcrumbPage>{path}</BreadcrumbPage>) : (<BreadcrumbLink href={href}>{path}</BreadcrumbLink>)}</BreadcrumbItem>{!isLast && <BreadcrumbSeparator />}</React.Fragment>);
            })}
        </BreadcrumbList></Breadcrumb>)

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <SidebarProvider >
                <AppSidebar />
                <SidebarTrigger className="sidebartrigger" size="icon-lg"  />
                <main>
                    {breadcrumb}
                    <Outlet />
                </main>
            </SidebarProvider>s
        </ThemeProvider>
    );


}