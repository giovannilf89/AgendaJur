import prismaClient from "../../prisma";

interface EditProcesso {
  id: string;
  editNumero: string;
}

class EditarProcessoService {
  async execute({ id, editNumero }: EditProcesso) {
    await prismaClient.processo.update({
      where: {
        id_proc: id,
      },
      data: {
        numero: editNumero,
      },
    });
    return { data: "Dados alterados com sucesso" };
  }
}

export { EditarProcessoService };
