import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiLocal from "../API/apiLocal/api";
import './editarprocesso.estilo.css'

export default function AlterarProcesso() {
  const iToken = localStorage.getItem("@tklogin2023");
  const token = JSON.parse(iToken);

  const navigation = useNavigate();
  const { id } = useParams();
  const [listaProcesso, setListaProcesso] = useState({});
  const [editNumero, setEditNumero] = useState("");
  const [editNota, setEditNota] = useState("");

  useEffect(() => {
    async function ListarProcesso() {
      const resposta = await apiLocal.get(`/ListarProcessoUnico/${id}`, {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });
      console.log(resposta.data);
      setListaProcesso(resposta.data);
    }
    ListarProcesso();
  }, [id, token]);

  useEffect(() => {
      setEditNumero(listaProcesso.numero);
      setEditNota(listaProcesso.notas)
  }, [listaProcesso]);

  async function alterarProcesso(e) {
    e.preventDefault();

    try {
      const resposta = await apiLocal.put(
        "/EditarProcesso",
        {
          id,
          editNumero,
          editNota,
        },
        {
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }
      );
      toast.success(resposta.data.dados);
      navigation("/ListarProcesso");
    } catch (error) {
      console.error("Erro ao editar Processo", error);
      toast.error("Erro ao editar Processo. Por favor, tente novamente");
    }
  }

  return (
    <div className="alterar-processo-container">
      <h1>Editar Processo</h1>
      <form onSubmit={alterarProcesso}>
        <label>Numero:</label>
        <input
          type="text"
          value={editNumero}
          onChange={(e) => setEditNumero(e.target.value)}
        />
        <br />
        <label>Notas:</label>
        <textarea cols="30" rows="10"
          type="text"
          value={editNota}
          onChange={(e) => setEditNota(e.target.value)}
        />
        <br />
        <button type="submit">Enviar</button>
      </form>
      <button onClick={() => navigation("/Dashboard")}>Voltar</button>
    </div>
  );
}