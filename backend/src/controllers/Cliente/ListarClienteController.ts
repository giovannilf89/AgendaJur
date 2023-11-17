import { Request, Response } from "express";
import { ListarClienteService } from "../../services/Cliente/ListarClienteService";

class ListarClienteController {
  async handle(req: Request, res: Response) {
    const listClienteService = new ListarClienteService();
    const cliente = await listClienteService.execute();

    return res.json(cliente);
  }
}

export { ListarClienteController };
