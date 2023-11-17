import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface Login {
  email: string;
  password: string;
}

class LoginService {
  async execute({ email, password }: Login) {
    // console.log(email, password);

    const usuario = await prismaClient.advogado.findFirst({
      where: {
        email: email,
      },
    });
    // console.log(usuario);
    if (!usuario) {
      throw new Error("Usuario/Senha incorretos");
    }
    const autenticado = await compare(password, usuario.senha);
    if (!autenticado) {
      throw new Error("Usuario/Senha incorretos");
    }

    const token = sign(
      {
        id: usuario.id_adv,
        email: usuario.email,
      },
      process.env.JWT_SECRET, // mudar no tsconfig  Type Checking  "strict": true to false

      {
        subject: usuario.id_adv,
        expiresIn: "24h",
      }
    );
    return {
      id: usuario.id_adv,
      email: usuario.email,
      token: token,
    };
  }
}

export { LoginService };
