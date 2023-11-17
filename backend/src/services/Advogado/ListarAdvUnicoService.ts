import prismaClient from "../../prisma";

interface ListarAdv {
  id: string;
}

class ListarAdvUnicoService {
  async execute({ id }: ListarAdv) {
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

export { ListarAdvUnicoService };
