import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { ListarProcessoService } from "../../services/Processo/ListarProcessoService";

class ListarProcessoController {
  async handle(req: Request, res: Response) {
    const listProcessoService = new ListarProcessoService();
    const processo = await listProcessoService.execute();
    return res.json(processo);
  }
}

export { ListarProcessoController };
