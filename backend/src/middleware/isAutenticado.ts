import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAutenticado(req: Request, res: Response, next: NextFunction) {
  const autetToken = req.headers.authorization;
  // console.log(autetToken); // testar se o token esta chegando

  if (!autetToken) {
    return res.json({ dados: "Token Invalido" });
  }

  const [, token] = autetToken.split(" ");
  // console.log(token);
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.user_id = sub;
    // console.log(sub);
    return next();
  } catch (err) {
    return res.json({ dados: "Token expirado" });
  }
}
