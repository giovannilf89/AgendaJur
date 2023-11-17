import prismaClient from "../../prisma";

class ListarClienteService {
  async execute() {
    const cliente = await prismaClient.cliente.findMany({});
    return cliente;
  }
}

export { ListarClienteService };
