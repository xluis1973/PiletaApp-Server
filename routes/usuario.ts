import { Router } from "express";
import { getUsuario, getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, login } from '../controllers/usuario.controller';
import { verificaToken } from "../middelware/autenticacion";

const userRouter= Router();



userRouter.get('/all',verificaToken,getUsuarios);

userRouter.get('/find',verificaToken,getUsuario);

userRouter.post('/create',crearUsuario);

userRouter.put('/update',verificaToken,actualizarUsuario);

userRouter.delete('/delete',verificaToken,borrarUsuario);

userRouter.post('/login',login);

export default userRouter;