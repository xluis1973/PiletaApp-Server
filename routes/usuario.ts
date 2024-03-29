import { Router } from "express";
import { crearEmpresa, getEmpresa, getEmpresaPorNro, getEmpresas, actualizarEmpresa } from '../controllers/empresa.controller';
import { crearFamiliar, getFamiliar, getFamiliares, getFamiliarPorAfiliado, actualizarFamiliar, borrarFamiliarPorNro } from '../controllers/familiar.controller';
import { crearTitular, getTitular, getTitulares, getTitularPorNro, actualizarTitular, borrarTitularPorNro } from '../controllers/titular.controller';
import { getUsuario, getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, login } from '../controllers/usuario.controller';
import { verificaToken } from '../middelware/autenticacion';

const userRouter= Router();

//Usuarios

userRouter.get('/usuarios/all',verificaToken,getUsuarios);

userRouter.get('/usuarios/find',verificaToken,getUsuario);

userRouter.post('/usuarios/create',crearUsuario);

userRouter.put('/usuarios/update',verificaToken,actualizarUsuario);

userRouter.delete('/usuarios/delete',verificaToken,borrarUsuario);

userRouter.post('/usuarios/login',login);

//Titulares

userRouter.get('/titulares/all',verificaToken,getTitulares);

userRouter.get('/titulares/find',verificaToken,getTitular);

userRouter.post('/titulares/create',verificaToken,crearTitular);

userRouter.get('/titulares/porNro',verificaToken,getTitularPorNro);

userRouter.put('/titulares/update',verificaToken,actualizarTitular);

userRouter.get('/titulares/borrar',verificaToken,borrarTitularPorNro);

//Familiares

userRouter.get('/familiares/all',verificaToken,getFamiliares);

userRouter.get('/familiares/find',verificaToken,getFamiliar);

userRouter.post('/familiares/create',verificaToken,crearFamiliar);

userRouter.get('/familiares/porAfiliado',verificaToken,getFamiliarPorAfiliado);

userRouter.put('/familiares/update',verificaToken,actualizarFamiliar);

userRouter.get('/familiares/borrar',verificaToken,borrarFamiliarPorNro);

//Empresas
userRouter.get('/empresas/all',verificaToken,getEmpresas);

userRouter.get('/empresas/find',verificaToken,getEmpresa);

userRouter.post('/empresas/create',verificaToken,crearEmpresa);

userRouter.put('/empresas/update',verificaToken,actualizarEmpresa);

userRouter.get('/empresas/porNro',verificaToken,getEmpresaPorNro);

export default userRouter;