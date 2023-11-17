import { Request, Response } from "express";
import { ListarAdvService } from "../../services/Advogado/ListarAdvService";

class ListarAdvController {
  async handle(req: Request, res: Response) {
    const listAdvService = new ListarAdvService();

    const user = await listAdvService.execute();

    return res.json(user);
  }
}

export { ListarAdvController };
