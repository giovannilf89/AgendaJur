import { useState, useEffect } from "react";
import apiLocal from "../API/apiLocal/api";
import { Link, useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

export default function ListarProcessos() {
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
        const resposta = await apiLocal.get("/ListarProcessoToken", {
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
      const response = await apiLocal.get("/ListarProcesso", {
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
    await apiLocal.delete("/DeletarProcesso", {
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
    <div>
      <h1>Processos Cadastrados</h1>
      {dados.map((result) => {
        return (
          <div>
            <h3>Número do Processo</h3>
            <h3>{result.numero}</h3>
            <strong>
              <Link to={`/EditarProcesso/${result.id_proc}`}>
                <BsFillPencilFill size="1rem" className="icon" />
              </Link>

              <BsFillTrashFill
                size="1rem"
                className="icon"
                onClick={() => handleDelete(result.id_proc)}
              />
            </strong>
          </div>
        );
      })}
      <button onClick={() => navigation("/Dashboard")}>Voltar</button>
    </div>
  );
}
