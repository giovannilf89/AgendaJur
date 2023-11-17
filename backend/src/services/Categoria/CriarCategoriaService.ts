import prismaClient from "../../prisma";

interface CriarCategoria {
  nome: string;
}

class CriarCategoriaService {
  async execute({ nome }: CriarCategoria) {
    // console.log("service", nome);

    const resposta = await prismaClient.categoria.create({
      data: {
        nome: nome,
      },
    });
    return resposta;
  }
}

export { CriarCategoriaService };
