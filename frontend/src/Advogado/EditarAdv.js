import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../API/apiLocal/api";

export default function AlterarAdv() {
  const iToken = localStorage.getItem("@tklogin2023");
  const token = JSON.parse(iToken);
  // console.log(token);

  const navigation = useNavigate();
  const { id } = useParams();
  const [listaAdv, setListaAdv] = useState("");
  const [editNome, setEditNome] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    async function listarAdv() {
      const resposta = await api.get(`/ListarAdvUnico/${id}`, {
        headers: {
          // eslint-disable-next-line no-useless-concat, no-undef
          Authorization: "Bearer " + `${token}`,
        },
      });
      setListaAdv(resposta.data);
      //   console.log(resposta);
    }
    listarAdv();
  }, [id]);

  useEffect(() => {
    setEditNome(listaAdv.nome);
    setEditEmail(listaAdv.email);
  }, [listaAdv]);

  async function alterarAdv(e) {
    e.preventDefault();

    try {
      const resposta = await api.put(
        "/EditarAdv",
        {
          id,
          editNome,
          editEmail,
        },
        {
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }
      );
      toast.info(resposta.data.dados);
      navigation("/ListarAdv");
    } catch (error) {
      console.error("Erro ao editar advogado:", error);
      // Trate o erro de alguma maneira, como exibindo uma mensagem ao usuário
      toast.error("Erro ao editar advogado. Por favor, tente novamente.");
    }
  }

  return (
    <div>
      <h1>Editar Advogado</h1>
      <form onSubmit={alterarAdv}>
        <label>Nome:</label>
        <input
          type="text"
          value={editNome}
          onChange={(e) => setEditNome(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <button onClick={() => navigation("/Dashboard")}>Voltar</button>
    </div>
  );
}