import { Request, Response } from "express";
import { ListarAdvTokenService } from "../../services/Advogado/ListarAdvTokenService";

class ListarAdvTokenController {
  async handle(req: Request, res: Response) {
    const id = req.user_id;

    const listarAdvToken = new ListarAdvTokenService();
    const resposta = await listarAdvToken.execute({
      id,
    });
    return res.json(resposta);
  }
}

export { ListarAdvTokenController };
