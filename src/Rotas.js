import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import { Tabela } from "./pages/Tabela";

function Rotas(props) {
  return (
    <div {...props}>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/tabela" element={<Tabela />} />
        </Routes>
      </div>
    </div>
  );
}

export default Rotas;