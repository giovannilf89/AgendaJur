import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface EditarAdv {
  id: string;
  editNome: string;
  editEmail: string;
  // editPassword: string;
}

class EditarAdvService {
  async execute({ id, editNome, editEmail }: EditarAdv) {
    // const senhaCrypt = await hash(editPassword, 8);
    await prismaClient.advogado.update({
      where: {
        id_adv: id,
      },
      data: {
        nome: editNome,
        email: editEmail,
        // senha: senhaCrypt,
      },
    });
    return { dados: "Dados alterados com sucesso" };
  }
}

export { EditarAdvService };
