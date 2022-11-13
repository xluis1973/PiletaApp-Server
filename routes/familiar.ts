import { Router } from "express";
import { crearFamiliar, getFamiliar, getFamiliares, getFamiliarPorAfiliado } from "../controllers/familiar.controller";
import { verificaToken } from "../middelware/autenticacion";

const familiarRouter=Router();

//Familiares

familiarRouter.get('/famliares/all',verificaToken,getFamiliares);

familiarRouter.get('/familiares/find',verificaToken,getFamiliar);

familiarRouter.post('/familiares/create',verificaToken,crearFamiliar);

familiarRouter.post('/familiares/porAfiliado',verificaToken,getFamiliarPorAfiliado);

export default familiarRouter;