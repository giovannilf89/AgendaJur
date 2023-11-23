import prismaClient from "../../prisma";

class ListarProcessoService {
  async execute() {
    const processo = await prismaClient.processo.findMany({});
    return processo
  }
}

export { ListarProcessoService };
