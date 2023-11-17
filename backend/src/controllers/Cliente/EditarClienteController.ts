import { Request, Response } from "express";
import { EditarClienteService } from "../../services/Cliente/EditarClienteService";

class EditarClienteController {
  async handle(req: Request, res: Response) {
    const {
      id,
      editNome,
      editDocumento,
      editCelular,
      editCep,
      editEndereco,
      editNumero,
      editBairro,
      editCidade,
      editEstado,
    } = req.body;
    const editClienteservice = new EditarClienteService();
    const edit = await editClienteservice.execute({
      id,
      editNome,
      editDocumento,
      editCelular,
      editCep,
      editEndereco,
      editNumero,
      editBairro,
      editCidade,
      editEstado,
    });
    return res.json(edit);
  }
}

export { EditarClienteController };
