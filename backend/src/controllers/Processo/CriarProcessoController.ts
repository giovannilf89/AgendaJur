import { Request, Response } from "express";
import { CriarProcessoService } from "../../services/Processo/CriarProcessoService";

class CriarProcessoController {
  async handle(req: Request, res: Response) {
    const {
      numero,
      notas,
      categoriaId,
      advogadoId,
      clienteId,
    } = req.body;
    console.log(req.body);

    if (!req.file) {
      throw new Error("Erro ao anexar processo, tente novamente");
    } else {

      const { originalname, filename: banner } = req.file

      const criarProcessoService = new CriarProcessoService();
      const resposta = await criarProcessoService.execute({
        numero,
        banner,
        notas,
        categoriaId,
        advogadoId,
        clienteId,
      });
      return res.json(resposta);
    }
  }
}

export { CriarProcessoController };
