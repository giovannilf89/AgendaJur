import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VisualizarProcesso = () => {
  const { id } = useParams();
  const [processo, setProcesso] = useState(null);

  useEffect(() => {
    const fetchProcesso = async () => {
      try {
        const response = await fetch(`/VisualizarProcesso/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProcesso(data.processo);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Erro ao obter os detalhes do processo:', error);
      }
    };

    fetchProcesso();
  }, [id]);

  return (
    <div>
      <h1>Detalhes do Processo</h1>
      {processo ? (
        <div>
          <p><strong>ID:</strong> {processo.id_proc}</p>
          <p><strong>Número:</strong> {processo.numero}</p>
          <p><strong>Notas:</strong> {processo.notas}</p>
          <p><strong>Banner:</strong> {processo.banner}</p>
          <p><strong>Categoria:</strong> {processo.categoria || 'N/A'}</p>
          <p><strong>Advogado:</strong> {processo.advogado || 'N/A'}</p>
          <p><strong>Cliente:</strong> {processo.cliente || 'N/A'}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default VisualizarProcesso;