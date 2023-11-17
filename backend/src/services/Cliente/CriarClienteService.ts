import prismaClient from "../../prisma";

interface CriarCliente {
  nome: string;
  documento: string;
  celular: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

class CriarClienteService {
  async execute({
    nome,
    documento,
    celular,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    estado,
  }: CriarCliente) {
    // console.log(nome, documento);

    if (
      !nome ||
      !documento ||
      !celular ||
      !cep ||
      !endereco ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado
    ) {
      throw new Error("Existem campos em branco");
    }
    const documentoExiste = await prismaClient.cliente.findFirst({
      where: {
        documento: documento,
      },
    });
    if (documentoExiste) {
      throw new Error("Documento ja cadastro");
    }
    const resposta = await prismaClient.cliente.create({
      data: {
        nome: nome,
        documento: documento,
        celular: celular,
        cep: cep,
        endereco: endereco,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
      },
      select: {
        id_cli: true,
        nome: true,
        documento: true,
        celular: true,
        cep: true,
        endereco: true,
        numero: true,
        bairro: true,
        cidade: true,
        estado: true,
      },
    });
    return resposta;
  }
}

export { CriarClienteService };
