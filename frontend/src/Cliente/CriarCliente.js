import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiLocal from "../API/apiLocal/api";
import { useNavigate } from "react-router-dom";
import apiCep from "../API/apiCep/apiCep";

function CadCliente() {
  const navigation = useNavigate();
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [celular, setCelular] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [buscaCep, setBuscaCep] = useState("");

  const iToken = localStorage.getItem("@tklogin2023");
  const token = JSON.parse(iToken);
  // console.log(token);

  async function handleBuscaCep() {
    const response = await apiCep.get(`${cep}/json/`);
    setBuscaCep(response.data);
  }

  useEffect(() => {
    function addBuscaCep() {
      setEndereco(buscaCep.logradouro || endereco);
      setBairro(buscaCep.bairro || bairro);
      setCidade(buscaCep.localidade || cidade);
      setEstado(buscaCep.uf || estado);
    }
    addBuscaCep();
  }, [handleBuscaCep]);

  async function Cadastro(e) {
    e.preventDefault();
    if (
      !nome ||
      !documento ||
      !celular ||
      !cep ||
      !endereco ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado
    ) {
      toast.warn("Existem campos em branco");
      return;
    }
    try {
      await apiLocal.post(
        "/CriarCliente",
        {
          nome,
          documento,
          celular,
          cep,
          endereco,
          numero,
          bairro,
          cidade,
          estado,
        },
        {
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }
      );
      toast.success("Cliente cadastrado com sucesso");
      navigation("/dashboard");
    } catch (err) {
      toast.error(err.response.data.error);
    }
    // try {
    //   await apiLocal.post("/CriarCliente", {
    //     nome,
    //     documento,
    //     celular,
    //     cep,
    //     endereco,
    //     numero,
    //     bairro,
    //     cidade,
    //     estado,
    //   });
    //   toast.success("Cliente cadastrado com sucesso");
    //   navigation("/dashboard");
    // } catch (err) {
    //   toast.error(err.response.data.error);
    // }
  }
  return (
    <div>
      <div>
        <h1>Cadastro Cliente</h1>
      </div>
      <div>
        <form onSubmit={Cadastro}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <br />
          <label>Documento</label>
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
          <br />
          <label>Celular</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
          <br />
          <label>Cep</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={handleBuscaCep}
          />
          <br />
          <label>Endereço</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <br />
          <label>Numero</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <br />
          <label>Bairro</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
          <br />
          <label>Cidade</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <br />
          <label>Estado</label>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <br />
          <button type="submit">Enviar</button>
        </form>
        <button onClick={() => navigation("/Dashboard")}>Voltar</button>
      </div>
    </div>
  );
}

export default CadCliente;
