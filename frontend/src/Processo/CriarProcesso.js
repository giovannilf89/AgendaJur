import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiLocal from "../API/apiLocal/api";
import {useNavigate} from 'react-router-dom'

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

  useEffect(
    () => {
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
      loadCategorias();
      loadAdvogados();
      loadClientes();
    },
    [],
    [],
    []
  );

  function handleDocument(e) {
    if (!e.target.files) {
      return;
    }
    const document = e.target.files[0];
    if (document.type === "document/pdf") {
      setDocument(document);
    }
  }

  async function handleCadastrar(e) {
    console.log(e.target)
    try {
      // e.preventDefault();
      const categoriaId = idCategoria;
      const advogadoId = idAdvogado;
      const clienteId = idCliente;
      const data = new FormData();

      data.append("numero", numero);
      data.append("notas", notas);
      data.append("categoriaId", categoriaId);
      data.append("advogadoId", advogadoId);
      data.append("clienteId", clienteId);
      data.append("banner", e.target.files[0], e.target.files[0].name);

      const iToken = localStorage.getItem("@tklogin2023");
      const token = JSON.parse(iToken);
      
      const resposta = await apiLocal.post("/CriarProcesso", data, {
        headers: {
          // eslint-disable-next-line no-useless-concat
          Authorization: "Bearer " + `${token}`,
        },
      });
      toast.success(resposta.data);
    } catch (err) {
      console.log(err);
    }
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
            <option>Selecione...</option>
            {categorias.map((item) => {
              return <option value={item.id}>{item.nome}</option>;
            })}
          </select>
          <br />
          <select
            value={idAdvogado}
            onChange={(e) => setIdAdvogado(e.target.value)}
          >
            <option>Selecione...</option>
            {advogados.map((item) => {
              return <option value={item.id}>{item.nome}</option>;
            })}
          </select>
          <br />
          <select
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
          >
            <option>Selecione...</option>
            {clientes.map((item) => {
              return <option value={item.id}>{item.nome}</option>;
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
          <input
            type="file"
            onChange={handleDocument}
          />
          <br />
          <button type="submit">Enviar</button>
        </form>
        <button onClick={() => navigation("/Dashboard")}>Voltar</button>
      </div>
    </div>
  );
}
