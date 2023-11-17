import prismaClient from "../../prisma";

interface EditCategoria {
  id: string;
  editNome: string;
}

class EditarCategoriaService {
  async execute({ id, editNome }: EditCategoria) {
    await prismaClient.categoria.update({
      where: {
        id_cat: id,
      },
      data: {
        nome: editNome,
      },
    });
    return { data: "Dados alterados com sucesso" };
  }
}

export { EditarCategoriaService };
