import { useState, useEffect } from "react";
import api from "../API/apiLocal/api";
import { Link, useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import './listar.estilo.css'


export default function ListarAdv() {
  const [dados, setDados] = useState([""]);
  const navigation = useNavigate();

  const iToken = localStorage.getItem("@tklogin2023");
  const token = JSON.parse(iToken);
  // console.log(token);
  useEffect(() => {
    if (!token) {
      navigation("/");
      return;
    } else if (token) {
      async function verificaToken() {
        const resposta = await api.get("/ListarAdvToken", {
          headers: {
            // eslint-disable-next-line no-useless-concat
            Authorization: "Bearer " + `${token}`,
          },
        });
        if (resposta.data.dados) {
          navigation("/");
          // alert("token invalido"); //testar se esta entrando nessa condicional
          return;
        }
        // console.log(resposta); // consulta a resposta da api
      }
      verificaToken();
    }
  });

  useEffect(() => {
    async function verDados() {
      const response = await api.get("/ListarAdv", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });
      // console.log(response);
      setDados(response.data);
    }
    verDados();
  });

  async function handleDelete(id) {
    await api.delete("/DeletarAdv", {
      data: {
        remove: id,
      },
      headers: {
        // eslint-disable-next-line no-useless-concat, no-undef
        Authorization: "Bearer " + `${token}`,
      },
    });

    // toast.success(resposta.data.dados);
    window.location.reload(true);
  }

  return (
<div className="lista-container">
    <h1 className="lista-header">Advogados cadastrados:</h1>
    {dados.map((result) => (
      <div key={result.id_adv} className="lista-item">
        <div className="lista-item-row">
          <label>Nome do Advogado:</label>
          <h3>{result.nome}</h3>
        </div>
        <div className="lista-item-row">
          <label>Email do Advogado:</label>
          <h3>{result.email}</h3>
        </div>
        <strong className="lista-item-row">
          <Link to={`/EditarAdv/${result.id_adv}`} className="icon">
            <BsFillPencilFill size="1rem" />
            <p>Editar</p>
          </Link>
          <Link className="icon">
          <BsFillTrashFill
            size="1rem"className="icon"
            onClick={() => handleDelete(result.id_adv)}
          />
          <p>Deletar</p>
          </Link>
        </strong>
      </div>
    ))}
    <button className="voltar-btn" onClick={() => navigation("/Dashboard")}>
      Voltar
    </button>
  </div>
  );
}
