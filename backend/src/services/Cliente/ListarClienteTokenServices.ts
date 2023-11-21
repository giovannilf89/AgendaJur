import prismaClient from "../../prisma";

interface TokenId {
  id: string;
}

class ListarClienteTokenServices {
  async execute({ id }: TokenId) {
    const resposta = await prismaClient.cliente.findUnique({
      where: {
        id_cli: id,
      },
      select: {
        id_cli: true,
        nome: true,
        documento: true,
      },
    });
    return resposta;
  }
}

export { ListarClienteTokenServices };
