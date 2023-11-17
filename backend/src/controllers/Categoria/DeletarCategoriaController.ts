import { Request, Response } from "express";
import { DeletarCategoriaService } from "../../services/Categoria/DeletarCategoriaService";

class DeletarCategoriaController {
  async handle(req: Request, res: Response) {
    const { remove } = req.body;

    const deletarCategoriaService = new DeletarCategoriaService();
    const del = await deletarCategoriaService.execute({
      remove,
    });
    return res.json(del);
  }
}

export { DeletarCategoriaController };
