import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"

function Home() {

    const navigate = useNavigate();
    return (
        <div className="home">
            <p>Gerencie seus containers, imagens e volumes.</p>
            <div className="cards">
                <button
                    className="card"
                    onClick={() => navigate("/containers")}
                >
                    <h2>📦 Containers</h2>
                    <p>Listar, iniciar, parar e remover containers.</p>
                </button>

                <button
                    className="card"
                    onClick={() => navigate("/container/create")}
                >
                    <h2>➕ Novo Container</h2>
                    <p>Criar um novo container Docker.</p>
                </button>

                <button
                    className="card"
                    onClick={() => navigate("/images")}
                >
                    <h2>🖼️ Imagens</h2>
                    <p>Visualizar imagens instaladas.</p>
                </button>

                <button
                    className="card"
                    onClick={() => navigate("/image/pull")}
                >
                    <h2>⬇️ Baixar Imagem</h2>
                    <p>Realizar pull de uma imagem do Docker Hub.</p>
                </button>

                <button
                    className="card"
                    onClick={() => navigate("/volumes")}
                >
                    <h2>💾 Volumes</h2>
                    <p>Gerenciar volumes Docker.</p>
                </button>

                <button
                    className="card"
                    onClick={() => navigate("/networks")}
                >
                    <h2>🌐 Networks</h2>
                    <p>Gerenciar redes Docker.</p>
                </button>

            </div>

        </div>

    );
}

export default Home;