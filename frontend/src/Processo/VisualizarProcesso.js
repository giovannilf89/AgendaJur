import React, { useEffect, useState } from "react";
import apiLocal from "../API/apiLocal/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import './visualizarprocesso.estilo.css'




export default function VisualizarProcesso() {
  const [dados, setDados] = useState("");
  const navigation = useNavigate();

  const { id } = useParams();

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
    async function VerDados() {
      try {
        const response = await apiLocal.get(`/VisualizarProcesso/${id}`, {
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        });
        console.log('Dados do PDF:', response.data.processo.banner);
        setDados(response.data.processo);
      } catch (error) {
        console.error('Erro ao carregar documento PDF:', error);
      }
    }
    VerDados();
  }, [id, token]);

  return (
    <div className="container-visualizar-processo">
      <h3>Número: {dados.numero}</h3>
      <h3>Classe processual: {dados.categoria}</h3>
      <h3>Advogado: {dados.advogado}</h3>
      <h3>Cliente: {dados.cliente}</h3>
      <h3>Notas: {dados.notas}</h3>
      {dados.banner && (
        <Link
         href={`D:/Meus Documentos/Codes/SENAC/AgendaJur/backend/tmp/${dados.banner}`} // Certifique-se de que os dados do PDF estão em base64
          target="_blank"
          width="100%"
          height="500px" rel="noreferrer"
          >Clique aqui</Link>
      )}
      <button onClick={() => navigation("/Dashboard")}>Voltar</button>
    </div>
  );
}
