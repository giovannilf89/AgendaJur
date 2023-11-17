import { Request, Response } from "express";
import { CriarAdvService } from "../../services/Advogado/CriarAdvService";

class CriarAdvController {
  async handle(req: Request, res: Response) {
    const { nome, email, password } = req.body; // desconstruindo o json {}
    // console.log(nome, email, password);

    const criarAdvService = new CriarAdvService();
    //instancia todos os metodos do services para const
    const resposta = await criarAdvService.execute({
      // nova constante para receber retorno do servico
      nome,
      email,
      password,
    });
    return res.json(resposta); // resposta que ele vai dar
  }
}

export { CriarAdvController };
