import {Request, Response} from 'express'
import { ListarProcessoUnicoService } from '../../services/Processo/ListarProcessoUnicoService'


class ListarProcessoUnicoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const listarProcUnicoService = new ListarProcessoUnicoService()
        const processo = await listarProcUnicoService.execute({
            id,
        })
        return res.json(processo)
    }
}

export {ListarProcessoUnicoController}