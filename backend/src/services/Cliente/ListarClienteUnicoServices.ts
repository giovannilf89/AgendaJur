import prismaClient from "../../prisma";

interface ListarCliente{
    id: string;
}

class ListarClienteUnicoService{
    async execute ({id}: ListarCliente) {
        const cliente = await prismaClient.cliente.findUnique({
            where:{
                id_cli: id,
            },
            select: {
                id_cli: true,
                nome: true,
                documento: true,
                celular: true,
                cep: true,
                endereco: true,
                numero: true,
                bairro: true,
                cidade: true,
                estado: true
            }
        })
        return cliente
    }

}

export {ListarClienteUnicoService}