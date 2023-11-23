import prismaClient from "../../prisma";

interface TokenId {
  id: string;
}

class ListarProcessoTokenService {
  async execute({ id }: TokenId) {
    const resposta = await prismaClient.processo.findMany({
      where: {
        id_proc: id,
      },
      select: {
        id_proc: true,
        numero: true,
      },
    });
    return resposta;
  }
}

export { ListarProcessoTokenService };
