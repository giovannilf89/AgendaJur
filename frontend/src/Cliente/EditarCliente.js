import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiLocal from "../API/apiLocal/api";
import './editarcliente.estilo.css'

export default function AlterarCliente() {
  const iToken = localStorage.getItem("@tklogin2023");
  const token = JSON.parse(iToken);

  const navigation = useNavigate();
  const { id } = useParams();
  const [listaCliente, setListaCliente] = useState("");
  const [editNome, setEditNome] = useState("");
  const [editDocumento, setEditDocumento] = useState("");
  const [editCelular, setEditCelular] = useState("");
  const [editCep, setEditCep] = useState("");
  const [editEndereco, setEditEndereco] = useState("");
  const [editNumero, setEditNumero] = useState("");
  const [editBairro, setEditBairro] = useState("");
  const [editCidade, setEditCidade] = useState("");
  const [editEstado, setEditEstado] = useState("");

  useEffect(() => {
    async function ListarCliente() {
      const resposta = await apiLocal.get(`/ListarClienteUnico/${id}`, {
        headers: {
          // eslint-disable-next-line no-useless-concat, no-undef
          Authorization: "Bearer " + `${token}`,
        },
      });
      console.log(resposta)
      setListaCliente(resposta.data)
    }
    ListarCliente();
  },[id, token]);

  useEffect(() => {
    setEditNome(listaCliente.nome);
    setEditDocumento(listaCliente.documento);
    setEditCelular(listaCliente.celular);
    setEditCep(listaCliente.cep);
    setEditEndereco(listaCliente.endereco);
    setEditNumero(listaCliente.numero);
    setEditBairro(listaCliente.bairro);
    setEditCidade(listaCliente.cidade);
    setEditEstado(listaCliente.estado);
  }, [listaCliente]);

  async function alterarCliente(e) {
    e.preventDefault();

    try {
      const resposta = await apiLocal.put(
        "/EditarCliente",
        {
          id,
          editNome,
          editDocumento,
          editCelular,
          editCep,
          editEndereco,
          editNumero,
          editBairro,
          editCidade,
          editEstado,
        },
        {
          headers: {
            // eslint-disable-next-line no-useless-concat
            Authorization: "Bearer " + `${token}`,
          },
        }
      );
      toast.success(resposta.data.dados);
      navigation("/ListarCliente");
    } catch (error) {
      console.error("Erro ao editar Cliente:", error);
      toast.error("Erro ao editar cliente. Por favor, tente novamente.");
    }
  }

  return (
    <div className="container-alterarcliente">
      <h1>Editar Cliente</h1>
      <form onSubmit={alterarCliente}>
        <label>Nome:</label>
        <input
          type="text"
          value={editNome}
          onChange={(e) => setEditNome(e.target.value)}
        />
        <label>Documento:</label>
        <input
          type="text"
          value={editDocumento}
          onChange={(e) => setEditDocumento(e.target.value)}
        />
        <label>Celular:</label>
        <input
          type="text"
          value={editCelular}
          onChange={(e) => setEditCelular(e.target.value)}
        />
        <label>Cep:</label>
        <input
          type="text"
          value={editCep}
          onChange={(e) => setEditCep(e.target.value)}
        />
        <label>Endereco:</label>
        <input
          type="text"
          value={editEndereco}
          onChange={(e) => setEditEndereco(e.target.value)}
        />
        <label>Numero:</label>
        <input
          type="text"
          value={editNumero}
          onChange={(e) => setEditNumero(e.target.value)}
        />
        <label>Bairro:</label>
        <input
          type="text"
          value={editBairro}
          onChange={(e) => setEditBairro(e.target.value)}
        />
        <label>Cidade:</label>
        <input
          type="text"
          value={editCidade}
          onChange={(e) => setEditCidade(e.target.value)}
        />
        <label>Estado:</label>
        <input
          type="text"
          value={editEstado}
          onChange={(e) => setEditEstado(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <button onClick={() => navigation("/ListarCliente")}>Voltar</button>
    </div>
  );
}
