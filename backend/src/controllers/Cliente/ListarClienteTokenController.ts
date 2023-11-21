import {Request, Response} from 'express'
import { ListarClienteService } from '../../services/Cliente/ListarClienteService';
import { ListarClienteTokenServices } from '../../services/Cliente/ListarClienteTokenServices';

class ListarClienteTokenController{
    async handle(req: Request, res: Response) {
        const id = req.user_id;

        const listarClienteToken = new ListarClienteTokenServices()
        const resposta = await listarClienteToken.execute({
            id,
        })
        return res.json(resposta)
    }
}

export {ListarClienteTokenController}