import { Request, Response } from "express";
import { DeletarClienteService } from "../../services/Cliente/DeletarClienteService";

class DeletarClienteController {
  async handle(req: Request, res: Response) {
    const { remove } = req.body;

    const deletarClienteService = new DeletarClienteService();
    const del = deletarClienteService.execute({
      remove,
    });
    return res.json(del);
  }
}

export { DeletarClienteController };
