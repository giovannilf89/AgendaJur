import { Request, Response } from "express";
import { CriarClienteService } from "../../services/Cliente/CriarClienteService";

class CriarClienteController {
  async handle(req: Request, res: Response) {
    const {
      nome,
      documento,
      celular,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
    } = req.body;
    console.log(nome);

    const criarClienteService = new CriarClienteService();
    const resposta = await criarClienteService.execute({
      nome,
      documento,
      celular,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
    });
    return res.json(resposta);
  }
}

export { CriarClienteController };
