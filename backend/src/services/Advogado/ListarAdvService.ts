import prismaClient from "../../prisma";

class ListarAdvService {
  async execute() {
    const user = await prismaClient.advogado.findMany({});
    return user;
  }
}

export { ListarAdvService };
