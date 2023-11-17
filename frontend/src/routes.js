import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/dashboard";
import Inicio from "./Inicio/inicio";
import CriarAdv from "./Advogado/CriarAdv";
import ListarAdv from './Advogado/ListarAdv'
import AlterarAdv from "./Advogado/EditarAdv";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CriarAdv" element={<CriarAdv />} /> 
        <Route path="/ListarAdv" element={<ListarAdv />} />
        <Route path="/EditarAdv/:id" element={<AlterarAdv />} />
      </Routes>
    </BrowserRouter>
  );
}
