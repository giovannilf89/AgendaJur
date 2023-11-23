import { Request, Response } from "express";
import { EditarProcessoService } from "../../services/Processo/EditarProcessoService";

class EditarProcessoController {
  async handle(req: Request, res: Response) {
    const { id, editNumero, editNotas } = req.body;
    const editProcessoService = new EditarProcessoService();
    const edit = await editProcessoService.execute({
      id,
      editNumero,
      editNotas,
    });
    return res.json(edit);
  }
}

export { EditarProcessoController };
