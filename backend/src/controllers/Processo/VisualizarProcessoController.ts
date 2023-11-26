import { Request, Response } from 'express';
import { VisualizarProcessoService } from '../../services/Processo/VisualizarProcessoService';

class VisualizarProcessoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const visualizaProcesso = new VisualizarProcessoService();

    try {
      const processo = await visualizaProcesso.execute({ id });

      if (!processo) {
        return res.status(404).json({ error: 'Processo não encontrado' });
      }

      return res.json({
        processo: {
          id_proc: processo.id_proc,
          numero: processo.numero,
          notas: processo.notas,
          banner: processo.banner,
          categoria: processo.categorias ? processo.categorias.nome : null,
          advogado: processo.Advogado ? processo.Advogado.nome : null,
          cliente: processo.clientes ? processo.clientes.nome : null,
        },
      });
    } catch (error) {
      console.error('Erro ao visualizar processo:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { VisualizarProcessoController };
