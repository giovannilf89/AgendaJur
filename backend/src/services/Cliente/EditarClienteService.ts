import prismaClient from "../../prisma";

interface EditCliente {
  id: string;
  editNome: string;
  editDocumento: string;
  editCelular: string;
  editCep: string;
  editEndereco: string;
  editNumero: string;
  editBairro: string;
  editCidade: string;
  editEstado: string;
}

class EditarClienteService {
  async execute({
    id,
    editNome,
    editDocumento,
    editCelular,
    editCep,
    editEndereco,
    editNumero,
    editBairro,
    editCidade,
    editEstado,
  }: EditCliente) {
    await prismaClient.cliente.update({
      where: {
        id_cli: id,
      },
      data: {
        nome: editNome,
        documento: editDocumento,
        celular: editCelular,
        cep: editCep,
        endereco: editEndereco,
        numero: editNumero,
        bairro: editBairro,
        cidade: editCidade,
        estado: editEstado,
      },
    });
    return { dados: "Dados alterados com sucesso" };
  }
}

export { EditarClienteService };
