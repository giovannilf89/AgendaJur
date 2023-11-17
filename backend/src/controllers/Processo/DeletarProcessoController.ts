import { Request, Response } from "express";
import { DeletarProcessoService } from "../../services/Processo/DeletarProcessoService";

class DeletarProcessoController {
  async handle(req: Request, res: Response) {
    const { remove } = req.body;

    const deletarProcessoService = new DeletarProcessoService();
    const del = await deletarProcessoService.execute({
      remove,
    });
    return res.json(del);
  }
}

export { DeletarProcessoController };
