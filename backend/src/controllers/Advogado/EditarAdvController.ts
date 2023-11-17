import { Request, Response } from "express";
import { EditarAdvService } from "../../services/Advogado/EditarAdvService";

class EditarAdvController {
  async handle(req: Request, res: Response) {
    const { id, editNome, editEmail } = req.body;
    // console.log(id, editNome, editEmail, editPassword);
    const editarAdvService = new EditarAdvService();
    const edit = await editarAdvService.execute({
      id,
      editNome,
      editEmail,
    });
    return res.json(edit);
  }
}

export { EditarAdvController };
