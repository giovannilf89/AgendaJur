import prismaClient from "../../prisma";

interface DeletarCliente {
  remove: string;
}

class DeletarClienteService {
  async execute({ remove }: DeletarCliente) {
    await prismaClient.cliente.delete({
      where: {
        id_cli: remove,
      },
    });
    return { data: "Registro apagado com sucesso" };
  }
}

export { DeletarClienteService };
