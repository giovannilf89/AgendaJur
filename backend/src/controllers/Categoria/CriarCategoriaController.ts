import { Request, Response } from "express";
import { CriarCategoriaService } from "../../services/Categoria/CriarCategoriaService";

class CriarCategoriaController {
  async handle(req: Request, res: Response) {
    const { nome } = req.body;
    // console.log(nome);

    const criarCategoriaServices = new CriarCategoriaService();
    const resposta = await criarCategoriaServices.execute({
      nome,
    });
    return res.json(resposta);
  }
}

export { CriarCategoriaController };
