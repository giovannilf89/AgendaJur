import prismaClient from "../../prisma";

interface DeletarCategoria {
  remove: string;
}

class DeletarCategoriaService {
  async execute({ remove }: DeletarCategoria) {
    await prismaClient.categoria.delete({
      where: {
        id_cat: remove,
      },
    });
    return { data: "Registro apagado com sucesso" };
  }
}

export { DeletarCategoriaService };
