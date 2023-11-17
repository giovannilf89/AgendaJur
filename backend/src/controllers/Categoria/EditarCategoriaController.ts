import { Request, Response } from "express";
import { EditarCategoriaService } from "../../services/Categoria/EditarCategoriaService";

class EditarCategoriaController {
  async handle(req: Request, res: Response) {
    const { id, editNome } = req.body;
    const editCategoriaService = new EditarCategoriaService();
    const edit = await editCategoriaService.execute({
      id,
      editNome,
    });
    return res.json(edit);
  }
}

export { EditarCategoriaController };
