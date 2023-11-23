import prismaClient from "../../prisma";

interface EditProcesso {
  id: string;
  editNumero: string;
  editNotas: string
}

class EditarProcessoService {
  async execute({ id, editNumero, editNotas }: EditProcesso) {
    await prismaClient.processo.update({
      where: {
        id_proc: id,
      },
      data: {
        numero: editNumero,
        notas: editNotas,
      },
    });
    return { dados: "Dados alterados com sucesso" };
  }
}

export { EditarProcessoService };
