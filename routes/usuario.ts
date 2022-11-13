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




export default userRouter;