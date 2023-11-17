import prismaClient from "../../prisma";

interface DeletarAdv {
  remove: string;
}

class DeletarAdvService {
  async execute({ remove }: DeletarAdv) {
    await prismaClient.advogado.delete({
      where: {
        id_adv: remove,
      },
    });
    return { dados: "Registro apagado com sucesso" };
  }
}

export { DeletarAdvService };
