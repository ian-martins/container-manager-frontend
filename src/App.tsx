import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react"
import Layout from "./Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Containers from "./pages/containers/Containers"
import Images from "./pages/images/Images";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Layout children={<Home />} />} />
        <Route path="/Containers" element={<Layout children={<Containers />} />} />
        <Route path="/login" element={<Layout children={<Login />} />} />
        <Route path="/images" element={<Layout children={<Images />} />} />
      </Routes>
    </BrowserRouter>
  );
}