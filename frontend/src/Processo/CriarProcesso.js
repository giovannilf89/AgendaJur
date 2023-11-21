import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiLocal from "../API/apiLocal/api";
import { Navigate, useNavigate } from "react-router-dom";

export default function Processos() {
  const [categorias, setCategorias] = useState([""]);
  const [advogados, setAdvogados] = useState([""]);
  const [clientes, setClientes] = useState([""]);

  const [numero, setNumero] = useState("");
  const [notas, setNotas] = useState("");

  const [idCategoria, setIdCategoria] = useState("");
  const [idAdvogado, setIdAdvogado] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [document, setDocument] = useState(null);

  const navigation = useNavigate();

  const iToken = localStorage.getItem("@tklogin2023");
  const token = JSON.parse(iToken);

  async function loadCategorias() {
    const resposta = await apiLocal.get("/ListarCategoria", {
      headers: {
        // eslint-disable-next-line no-useless-concat
        Authorization: "Bearer " + `${token}`,
      },
    });

    setCategorias(resposta.data);
  }
  async function loadAdvogados() {
    const resposta = await apiLocal.get("/ListarAdv", {
      headers: {
        // eslint-disable-next-line no-useless-concat
        Authorization: "Bearer " + `${token}`,
      },
    });
    setAdvogados(resposta.data);
  }
  async function loadClientes() {
    const resposta = await apiLocal.get("/ListarCliente", {
      headers: {
        // eslint-disable-next-line no-useless-concat
        Authorization: "Bearer " + `${token}`,
      },
    });
    setClientes(resposta.data);
  }

  useEffect(() => {
    loadCategorias();
    loadAdvogados();
    loadClientes();
  }, []);

  function handleDocument(e) {
    // console.log(e.target.files);
    if (!e.target.files) {
      return;
    }
    if (e.target.files[0].type !== "application/pdf") {
      toast.warn("Somente arquivos no formato PDF são aceitos");
      e.target.value = null;
      return;
    }

    const document = e.target.files[0];
    setDocument(document);
    toast.success("Processo anexado com sucesso");
  }

  async function handleCadastrar(e) {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("numero", numero);
      data.append("notas", notas);
      data.append("categoriaId", idCategoria);
      data.append("advogadoId", idAdvogado);
      data.append("clienteId", idCliente);
      data.append("file", document, document.name);

      const iToken = localStorage.getItem("@tklogin2023");
      const token = JSON.parse(iToken);

      const resposta = await apiLocal.post("/CriarProcesso", data, {
        headers: {
          // eslint-disable-next-line no-useless-concat
          Authorization: "Bearer " + token,
        },
      });
      toast.success(resposta.data.dados);
      navigation("/Dashboard");
    } catch (err) {
      console.log(err);
    }
    // setIdCategoria("");
    // setIdAdvogado("");
    // setIdCliente("");
    // setNumero("");
    // setNotas("");
    // setDocument("");
  }
  return (
    <div>
      <div>
        <h1>Processos</h1>
      </div>
      <div>
        <form onSubmit={handleCadastrar}>
          <select
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option value="1">Selecione...</option>
            {categorias.map((item, idx) => {
              return (
                <option key={idx} value={item.id_cat}>
                  {item.nome}
                </option>
              );
            })}
          </select>
          <br />
          <select
            value={idAdvogado}
            onChange={(e) => setIdAdvogado(e.target.value)}
          >
            <option value="1">Selecione...</option>
            {advogados.map((item, idx) => {
              return (
                <option key={idx} value={item.id_adv}>
                  {item.nome}
                </option>
              );
            })}
          </select>
          <br />
          <select
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
          >
            <option value="1">Selecione...</option>
            {clientes.map((item, idx) => {
              return (
                <option key={idx} value={item.id_cli}>
                  {item.nome}
                </option>
              );
            })}
          </select>
          <br />
          <label>Numero do Processo</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <br />
          <label>Notas</label>
          <input
            type="text"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
          <br />
          <label>Processo PDF</label>
          <input type="file" onChange={handleDocument} />
          <br />
          <button type="submit">Enviar</button>
        </form>
        <button onClick={() => navigation("/Dashboard")}>Voltar</button>
      </div>
    </div>
  );
}
