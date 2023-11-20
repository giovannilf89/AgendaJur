import prismaClient from "../../prisma";

interface CriarProcesso {
  numero: string;
  banner: string;
  notas: string;
  categoriaId: string;
  advogadoId: string;
  clienteId: string;
}

class CriarProcessoService {
  async execute({
    numero,
    banner,
    notas,
    categoriaId,
    advogadoId,
    clienteId,
  }: CriarProcesso) {
    // console.log("service", numero);
    if (!numero || !banner || !notas || !categoriaId || !advogadoId || !clienteId) {
      throw new Error("Campos em branco não são permitidos");
    }

    await prismaClient.processo.create({
      data: {
        numero: numero,
        banner: banner,
        notas: notas,
        categoriaId: categoriaId,
        advogadoId: advogadoId,
        clienteId: clienteId,
      },
    });
    return { data: "Processo criado com sucesso" };
  }
}

export { CriarProcessoService };
