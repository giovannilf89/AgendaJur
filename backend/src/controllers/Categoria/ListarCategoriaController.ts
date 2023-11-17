import { Request, Response } from "express";
import { ListarCategoriaService } from "../../services/Categoria/ListarCategoriaService";

class ListarCategoriaController {
  async handle(req: Request, res: Response) {
    const listCategoriaService = new ListarCategoriaService();
    const categoria = await listCategoriaService.execute();

    return res.json(categoria);
  }
}
export { ListarCategoriaController };
