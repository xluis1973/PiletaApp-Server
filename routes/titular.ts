import { Router } from "express";
import { crearTitular, getTitular, getTitulares, getTitularPorNro } from "../controllers/titular.controller";
import { verificaToken } from "../middelware/autenticacion";
const titularRouter= Router();

//Titulares

titularRouter.get('/titulares/all',verificaToken,getTitulares);

titularRouter.get('/titulares/find',verificaToken,getTitular);

titularRouter.post('/titulares/create',verificaToken,crearTitular);

titularRouter.post('/titulares/porNro',verificaToken,getTitularPorNro);

export default titularRouter;