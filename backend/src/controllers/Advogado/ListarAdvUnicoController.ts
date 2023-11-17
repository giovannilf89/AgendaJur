import { Request, Response } from "express";
import { ListarAdvUnicoService } from "../../services/Advogado/ListarAdvUnicoService";

class ListarAdvUnicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listarAdvUnicoService = new ListarAdvUnicoService();
    const adv = await listarAdvUnicoService.execute({
      id,
    });
    return res.json(adv);
  }
}

export { ListarAdvUnicoController };
