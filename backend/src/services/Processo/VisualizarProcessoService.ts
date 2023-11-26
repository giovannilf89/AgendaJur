import prismaClient from "../../prisma";
interface Processo {
  id: string;
}

class VisualizarProcessoService {
  async execute({ id }: Processo) {
    const processo = await prismaClient.processo.findUnique({
      where: {
        id_proc: id,
      },
      include: {
        categorias: {
          select: {
            nome: true,
          },
        },
        Advogado: {
          select: {
            nome: true,
          },
        },
        clientes: {
          select: {
            nome: true,
          },
        },
      },
    });

    return processo;
  }
}

export { VisualizarProcessoService };
