import { Request, Response } from "express";
import { EditarProcessoService } from "../../services/Processo/EditarProcessoService";

class EditarProcessoController {
  async handle(req: Request, res: Response) {
    const { id, editNumero, editNome } = req.body;
    const editProcessoService = new EditarProcessoService();
    const edit = await editProcessoService.execute({
      id,
      editNome,
      editNumero,
    });
    return res.json(edit);
  }
}

export { EditarProcessoController };
