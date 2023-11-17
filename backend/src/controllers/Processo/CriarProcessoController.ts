import { Request, Response } from "express";
import { CriarProcessoService } from "../../services/Processo/CriarProcessoService";

class CriarProcessoController {
  async handle(req: Request, res: Response) {
    const { numero, nome_parte, categoriaId, advogadoId, clienteId } = req.body;
    // console.log(numero, nome_parte);

    const criarProcessoService = new CriarProcessoService();
    const resposta = await criarProcessoService.execute({
      numero,
      nome_parte,
      categoriaId,
      advogadoId,
      clienteId,
    });
    return res.json(resposta);
  }
}

export { CriarProcessoController };
