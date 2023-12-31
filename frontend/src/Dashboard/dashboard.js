import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiLocal from "../API/apiLocal/api";
import { Link } from "react-router-dom";
import "./dashboard.css"


export default function Dashboard() {
  const navigation = useNavigate();

  useEffect(() => {
    const iToken = localStorage.getItem("@tklogin2023");
    const token = JSON.parse(iToken);

    if (!token) {
      navigation("/");
      return;
    } else if (token) {
      async function verificaToken() {
        const resposta = await apiLocal.get("/ListarAdvToken", {
          headers: {
            // eslint-disable-next-line no-useless-concat
            Authorization: "Bearer " + `${token}`,
          },
        });
        if (resposta.data?.dados) {   // PERGUNTAR PROF OU DANILO PORQUE ESTA VINDO NULO
          navigation("/");
          // alert("token invalido"); //testar se esta entrando nessa condicional
          return;
        }
        // console.log(resposta); // consulta a resposta da api
      }
      verificaToken();
    }
  }, []);

  function handleSair() {
    localStorage.removeItem("@tklogin2023");
    navigation("/");
  }

  return (
    <div className="container">
      <div className="formulario">
        <h1>Dashboard</h1>
        <div className="menu">
          <h2><Link to="/CriarAdv">Cadastrar Advogado</Link></h2>
          <h2><Link to="/ListarAdv">Listar Advogados</Link></h2>
          <h2><Link to="/CriarCliente">Criar Cliente</Link></h2>
          <h2><Link to="/ListarCliente">Listar Clientes</Link></h2>
          <h2><Link to="/CriarProcesso">Criar Processo</Link></h2>
          <h2><Link to="/ListarProcesso">Listar Processos</Link></h2>
          <button onClick={handleSair}>Sair</button>
        </div>
      </div>
    </div>
  );
}