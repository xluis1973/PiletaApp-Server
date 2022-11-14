import { Router } from "express";
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




export default userRouter;