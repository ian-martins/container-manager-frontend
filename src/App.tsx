import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react"
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Containers from "./pages/containers/Containers"
import Images from "./pages/images/Images";
import { ThemeProvider } from "@/components/theme-provider"
import Connection from "./pages/conexoes/Connection";
import { Welcome } from "./pages/home/Welcome";
import NewContainers from "./pages/containers/NewConntainer";
import Terminal from "./pages/terminal/Terminal";

export default function App() {

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/home/containers" element={<Containers />} />
                        <Route path="/home/containers/create" element={<NewContainers />} />
                        <Route path="/images" element={<Images />} />
                        <Route path="/home/conexao" element={<Connection />} />
                        <Route path="/home/terminal" element={<Terminal />} />
                    </Route>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/auth/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    );
}