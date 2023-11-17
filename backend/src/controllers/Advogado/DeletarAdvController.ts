import { Request, Response } from "express";
import { DeletarAdvService } from "../../services/Advogado/DeletarAdvService";

class DeletarAdvController {
  async handle(req: Request, res: Response) {
    const { remove } = req.body;
    // console.log(remove)

    const deletarAdvService = new DeletarAdvService();
    const del = await deletarAdvService.execute({
      remove,
    });
    return res.json(del);
  }
}

export { DeletarAdvController };
