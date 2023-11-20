import { Router } from "express";
import { CriarAdvController } from "./controllers/Advogado/CriarAdvController";
import { DeletarAdvController } from "./controllers/Advogado/DeletarAdvController";
import { EditarAdvController } from "./controllers/Advogado/EditarAdvController";
import { ListarAdvController } from "./controllers/Advogado/ListarAdvController";
import { ListarAdvTokenController } from "./controllers/Advogado/ListarAdvTokenController";
import { ListarAdvUnicoController } from "./controllers/Advogado/ListarAdvUnicoController";
import { CriarCategoriaController } from "./controllers/Categoria/CriarCategoriaController";
import { DeletarCategoriaController } from "./controllers/Categoria/DeletarCategoriaController";
import { EditarCategoriaController } from "./controllers/Categoria/EditarCategoriaController";
import { ListarCategoriaController } from "./controllers/Categoria/ListarCategoriaController";
import { CriarClienteController } from "./controllers/Cliente/CriarClienteController";
import { DeletarClienteController } from "./controllers/Cliente/DeletarClienteController";
import { EditarClienteController } from "./controllers/Cliente/EditarClienteController";
import { ListarClienteController } from "./controllers/Cliente/ListarClienteController";
import { LoginController } from "./controllers/Login/LoginController";
import { CriarProcessoController } from "./controllers/Processo/CriarProcessoController";
import { DeletarProcessoController } from "./controllers/Processo/DeletarProcessoController";
import { EditarProcessoController } from "./controllers/Processo/EditarProcessoController";
import { ListarProcessoController } from "./controllers/Processo/ListarProcessController";
import { isAutenticado } from "./middleware/isAutenticado";
import { ListarAdvTokenService } from "./services/Advogado/ListarAdvTokenService";


import multer from 'multer'
import uploadConfig from './config/multer'

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'))

export { router };

// Login

router.post("/Login", new LoginController().handle);

// Advogados

router.post("/CriarAdv", new CriarAdvController().handle);
router.delete("/DeletarAdv", isAutenticado, new DeletarAdvController().handle);
router.put("/EditarAdv", isAutenticado, new EditarAdvController().handle);
router.get("/ListarAdv", isAutenticado, new ListarAdvController().handle);
router.get(
  "/ListarAdvUnico/:id",
  isAutenticado,
  new ListarAdvUnicoController().handle
);
router.get(
  "/ListarAdvToken",
  isAutenticado,
  new ListarAdvTokenController().handle
);

// Categoria

router.post(
  "/CriarCategoria",
  isAutenticado,
  new CriarCategoriaController().handle
);
router.delete(
  "/DeletarCategoria",
  isAutenticado,
  new DeletarCategoriaController().handle
);
router.put(
  "/EditarCategoria",
  isAutenticado,
  new EditarCategoriaController().handle
);
router.get(
  "/ListarCategoria",
  isAutenticado,
  new ListarCategoriaController().handle
);

// Processo

router.post(
  "/CriarProcesso",
  isAutenticado, upload.single('file'),
  new CriarProcessoController().handle
);
router.delete(
  "/DeletarProcesso",
  isAutenticado,
  new DeletarProcessoController().handle
);
router.put(
  "/EditarProcesso",
  isAutenticado,
  new EditarProcessoController().handle
);
router.get(
  "/ListarProcesso",
  isAutenticado,
  new ListarProcessoController().handle
);

// Cliente

router.post(
  "/CriarCliente",
  isAutenticado,
  new CriarClienteController().handle
);
router.delete(
  "/DeletarCliente",
  isAutenticado,
  new DeletarClienteController().handle
);
router.put(
  "/EditarCliente",
  isAutenticado,
  new EditarClienteController().handle
);
router.get(
  "/ListarCliente",
  isAutenticado,
  new ListarClienteController().handle
);
