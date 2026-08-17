import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react"
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Containers from "./pages/containers/Containers"
import Images from "./pages/images/Images";
import { ThemeProvider } from "@/components/theme-provider"
import Conect from "./pages/conexoes/Conect";
import { Welcome } from "./pages/home/Welcome";

export default function App() {

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/home/containers" element={<Containers />} />
                        <Route path="/images" element={<Images />} />
                    </Route>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/auth/conexao" element={<Conect />} />
                    <Route path="/auth/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    );
}