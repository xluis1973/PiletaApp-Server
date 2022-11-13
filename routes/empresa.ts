import { Router } from "express";
import { crearEmpresa, getEmpresa, getEmpresaPorNro, getEmpresas } from "../controllers/empresa.controller";
import { verificaToken } from "../middelware/autenticacion";



const empresaRouter= Router();

//Empresas
empresaRouter.get('/empresas/all',verificaToken,getEmpresas);

empresaRouter.get('/empresas/find',verificaToken,getEmpresa);

empresaRouter.post('/empresas/create',verificaToken,crearEmpresa);

empresaRouter.post('/empresas/porNro',verificaToken,getEmpresaPorNro);

export default empresaRouter;