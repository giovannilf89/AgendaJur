import { Request, Response } from "express";
import { LoginService } from "../../services/Login/LoginService";

class LoginController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    // console.log(email, password);

    const loginService = new LoginService();
    const resposta = await loginService.execute({
      email,
      password,
    });
    return res.json(resposta);
  }
}

export { LoginController };
