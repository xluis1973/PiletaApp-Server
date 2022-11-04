import { Router } from "express";
import { getUsuario, getUsuarios } from "../controllers/usuario.controller";

const userRouter= Router();



userRouter.get('/all',getUsuarios);

userRouter.get('/find',getUsuario);

export default userRouter;