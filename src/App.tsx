import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react"
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Containers from "./pages/containers/Containers"
import Images from "./pages/images/Images";
export default function App() {
    const home = "home"
    const containers = "containers"
    const login = "login"
    const images = "images"

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/containers" element={<Containers />} />
                    <Route path="/images" element={<Images />} />
                </Route>
                
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}