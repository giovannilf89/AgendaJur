import {Request, Response } from 'express'
import { ListarProcessoTokenService } from '../../services/Processo/ListarProcessoTokenService'

class ListarProcessoTokenController {
    async handle(req: Request, res: Response) {
        const id = req.user_id;

        const listarProcToken = new ListarProcessoTokenService()
        const resposta = await listarProcToken.execute({
            id,
        })
        return res.json(resposta)
    }
}

export {ListarProcessoTokenController}