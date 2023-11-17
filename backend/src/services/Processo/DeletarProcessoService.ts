import prismaClient from "../../prisma";

interface DeletarProcesso {
  remove: string;
}

class DeletarProcessoService {
  async execute({ remove }: DeletarProcesso) {
    await prismaClient.processo.delete({
      where: {
        id_proc: remove,
      },
    });
    return { data: "Registro apagado com sucesso" };
  }
}

export { DeletarProcessoService };
