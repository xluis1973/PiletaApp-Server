import { Request, Response } from "express";
import Usuario from '../models/usuario.model';

export const getUsuarios=async (req:Request,resp:Response)=>{

    const usuarios=await Usuario.findAll();

    resp.json({usuarios});
};

export const getUsuario=async (req:Request,resp:Response)=>{

    const id=req.body.id;
    const usuario=await Usuario.findByPk(id);
    if(usuario && id){
        resp.json(usuario);
    } else {
        resp.status(404).json({
            msg:`No existe un usuario con el id ${req.body.id}`
        });
    }

    
};