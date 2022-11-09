import { Router } from "express";
import { getUsuario, getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, login } from '../controllers/usuario.controller';
import { verificaToken, verificaTokenOtros } from '../middelware/autenticacion';
import { getEmpresas, getEmpresa, crearEmpresa, getEmpresaPorNro } from '../controllers/empresa.controller';
import { getTitular, getTitulares, crearTitular, getTitularPorNro } from '../controllers/titular.controller';
import { getFamiliares, getFamiliar, crearFamiliar, getFamiliarPorAfiliado } from '../controllers/familiar.controller';
const userRouter= Router();

//Usuarios

userRouter.get('/usuarios/all',verificaToken,getUsuarios);

userRouter.get('/usuarios/find',verificaToken,getUsuario);

userRouter.post('/usuarios/create',crearUsuario);

userRouter.put('/usuarios/update',verificaToken,actualizarUsuario);

userRouter.delete('/usuarios/delete',verificaToken,borrarUsuario);

userRouter.post('/usuarios/login',login);

//Empresas
userRouter.get('/empresas/all',verificaToken,getEmpresas);

userRouter.get('/empresas/find',verificaToken,getEmpresa);

userRouter.post('/empresas/create',verificaToken,crearEmpresa);

userRouter.post('/empresas/porNro',verificaToken,getEmpresaPorNro);

//Titulares

userRouter.get('/titulares/all',verificaToken,getTitulares);

userRouter.get('/titulares/find',verificaToken,getTitular);

userRouter.post('/titulares/create',verificaToken,crearTitular);

userRouter.post('/titulares/porNro',verificaToken,getTitularPorNro);
//Familiares

userRouter.get('/famliares/all',verificaToken,getFamiliares);

userRouter.get('/familiares/find',verificaToken,getFamiliar);

userRouter.post('/familiares/create',verificaToken,crearFamiliar);

userRouter.post('/familiares/porAfiliado',verificaToken,getFamiliarPorAfiliado);
export default userRouter;