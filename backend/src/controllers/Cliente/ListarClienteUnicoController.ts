import {Request, Response} from 'express'
import {ListarClienteUnicoService} from '../../services/Cliente/ListarClienteUnicoServices'

class ListarClienteUnicoController {
    async handle(req: Request, res: Response){
        const {id} = req.params 

        const listarClienteUnicoService = new ListarClienteUnicoService()
        const cliente = await listarClienteUnicoService.execute({
            id,
        })
        return res.json(cliente)
    }
}

export {ListarClienteUnicoController}