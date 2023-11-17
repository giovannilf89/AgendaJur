import prismaClient from "../../prisma";

interface EditProcesso {
  id: string;
  editNumero: string;
  editNome: string;
}

class EditarProcessoService {
  async execute({ id, editNumero, editNome }: EditProcesso) {
    await prismaClient.processo.update({
      where: {
        id_proc: id,
      },
      data: {
        numero: editNumero,
        nome_parte: editNome,
      },
    });
    return { data: "Dados alterados com sucesso" };
  }
}

export { EditarProcessoService };
