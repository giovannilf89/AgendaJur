import { useState, useEffect } from "react";
import apiLocal from "../API/apiLocal/api";
import { Link, useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import './listarcliente.estilo.css'

export default function ListarClientes() {
  const [dados, setDados] = useState([""]);
  const navigation = useNavigate();

  const iToken = localStorage.getItem("@tklogin2023");
  const token = JSON.parse(iToken);

  useEffect(() => {
    if (!token) {
      navigation("/");
      return;
    } else if (token) {
      async function verificaToken() {
        const resposta = await apiLocal.get("/ListarClienteToken", {
          headers: {
            // eslint-disable-next-line no-useless-concat
            Authorization: "Bearer " + `${token}`,
          },
        });
        if (resposta.data.dados) {
          navigation("/");
          return;
        }
      }
      verificaToken();
    }
  });

  useEffect(() => {
    async function verDados() {
      const response = await apiLocal.get("/ListarCliente", {
        headers: {
          // eslint-disable-next-line no-useless-concat
          Authorization: "Bearer " + `${token}`,
        },
      });
      setDados(response.data);
    }
    verDados();
  });

  async function handleDelete(id) {
    await apiLocal.delete("/DeletarCliente", {
      data: {
        remove: id,
      },
      headers: {
        // eslint-disable-next-line no-useless-concat
        Authorization: "Bearer " + `${token}`,
      },
    });
    window.location.reload(true);
  }

  return (
    <div className="container-cadcliente">
      <h1>Clientes Cadastrados</h1>
      {dados.map((result) => {
        return (
          <div className="lista"> 
            <h3>Nome</h3>
            <h3>{result.nome}</h3>
            <strong>
              <Link to={`/EditarCliente/${result.id_cli}`}>
                <BsFillPencilFill size="1rem" className="icon" />
                <p>Editar</p>
              </Link>
              <Link>
              <BsFillTrashFill
                size="1rem"
                className="icon"
                onClick={() => handleDelete(result.id_cli)}
              />
              <p>Deletar</p>
              </Link>
            </strong>
          </div>
        );
      })}
      <button onClick={() => navigation("/Dashboard")}>Voltar</button>
    </div>
  );
}
