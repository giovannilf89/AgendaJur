import prismaClient from "../../prisma";

interface CriarProcesso {
  numero: string;
  nome_parte: string;
  categoriaId: string;
  advogadoId: string;
  clienteId: string;
}

class CriarProcessoService {
  async execute({
    numero,
    nome_parte,
    categoriaId,
    advogadoId,
    clienteId,
  }: CriarProcesso) {
    // console.log("service", numero, nome_parte);
    if (!numero || !nome_parte || !categoriaId || !advogadoId || !clienteId) {
      throw new Error("Campos em branco não são permitidos");
    }

    await prismaClient.processo.create({
      data: {
        numero: numero,
        nome_parte: nome_parte,
        categoriaId: categoriaId,
        advogadoId: advogadoId,
        clienteId: clienteId,
      },
    });
    return { data: "Processo criado com sucesso" };
  }
}

export { CriarProcessoService };
