import prismaClient from "../../prisma";

class ListarCategoriaService {
  async execute() {
    const categoria = await prismaClient.categoria.findMany({});
    return categoria;
  }
}

export { ListarCategoriaService };
