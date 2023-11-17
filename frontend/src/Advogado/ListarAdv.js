import { useState, useEffect } from "react";
import api from "../API/apiLocal/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import apiLocal from "../API/apiLocal/api";

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
        const resposta = await apiLocal.get("/ListarAdvToken", {
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
  }, []);

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
  }, []);

  async function handleDelete(id) {
    const resposta = await api.delete("/DeletarAdv", {
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
    <div>
      <h1>Advogados cadastrados:</h1>
      {dados.map((result) => {
        return (
          <div>
            <h3>Nome do Advogado:</h3>
            <h3>{result.nome}</h3>
            <h3>Email do Advogado:</h3>
            <h3>{result.email}</h3>
            <strong>
              <Link to={`/EditarAdv/${result.id_adv}`}>
                <BsFillPencilFill size="1rem" className="icon" />
              </Link>

              <BsFillTrashFill
                size="1rem"
                className="icon"
                onClick={() => handleDelete(result.id_adv)}
              />
            </strong>
          </div>
        );
      })}
      <button onClick={() => navigation("/Dashboard")}>Voltar</button>
    </div>
  );
}
