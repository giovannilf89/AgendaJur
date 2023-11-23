import prismaClient from "../../prisma";

interface ListarProc {
    id: string
}

class ListarProcessoUnicoService{
 async execute ({id}: ListarProc) {
    const processo = await prismaClient.processo.findUnique({
        where: {
            id_proc: id,
        },
        select: {
            id_proc: true,
            numero: true,
            notas: true,
            banner: true,
        }
    })
    return processo
 }
}

export {ListarProcessoUnicoService}