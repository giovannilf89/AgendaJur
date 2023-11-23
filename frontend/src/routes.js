import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/dashboard";
import Inicio from "./Inicio/inicio";
import CriarAdv from "./Advogado/CriarAdv";
import ListarAdv from './Advogado/ListarAdv'
import AlterarAdv from "./Advogado/EditarAdv";
import CriarCliente from './Cliente/CriarCliente'
import CriarProcesso from './Processo/CriarProcesso'
import ListarClientes from "./Cliente/ListarCliente";
import EditarCliente from "./Cliente/EditarCliente"
import ListarProcessos from "./Processo/ListarProcesso";
import EditarProcesso from './Processo/EditarProcesso'
export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CriarAdv" element={<CriarAdv />} /> 
        <Route path="/ListarAdv" element={<ListarAdv />} />
        <Route path="/EditarAdv/:id" element={<AlterarAdv />} />
        <Route path="/CriarCliente" element={<CriarCliente />} />
        <Route path="/EditarCliente/:id" element={<EditarCliente />} />
        <Route path="/ListarCliente" element={<ListarClientes />} />
        <Route path="/CriarProcesso" element={<CriarProcesso />} />
        <Route path="/ListarProcesso" element={<ListarProcessos />} />
        <Route path="/EditarProcesso/:id" element={<EditarProcesso />} />
      </Routes>
    </BrowserRouter>
  );
}
