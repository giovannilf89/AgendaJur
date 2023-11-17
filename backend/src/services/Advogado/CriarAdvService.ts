import PrismaClient from "../../prisma";
import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface CriarAdvogado {
  nome: string;
  email: string;
  password: string;
}

class CriarAdvService {
  async execute({ nome, email, password }: CriarAdvogado) {
    // console.log("service", nome, email, password);

    if (!nome || !email || !password) {
      throw new Error("Existem campos em branco");
    }
    const emailExiste = await prismaClient.advogado.findFirst({
      where: {
        email: email,
      },
    });
    if (emailExiste) {
      throw new Error("Email ja cadastrado");
    }
    const senhaCrypt = await hash(password, 8);
    const resposta = await prismaClient.advogado.create({
      data: {
        nome: nome,
        email: email,
        senha: senhaCrypt,
      },
      select: {
        id_adv: true,
        nome: true,
        email: true,
      },
    });
    return resposta;
  }
}

export { CriarAdvService };
