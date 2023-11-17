import prismaClient from "../../prisma";

interface TokenId {
  id: string;
}

class ListarAdvTokenService {
  async execute({ id }: TokenId) {
    const resposta = await prismaClient.advogado.findUnique({
      where: {
        id_adv: id,
      },
      select: {
        id_adv: true,
        nome: true,
        email: true,
      },
    });
    return resposta;
  }
}

export { ListarAdvTokenService };
