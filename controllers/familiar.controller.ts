import { Request, response, Response } from "express";
import Familiar from "../models/titular.model";


export const getFamiliares=async (req:Request,resp:Response)=>{

    const familiares=await Familiar.findAll();

    resp.json({familiares});
};

export const getFamiliar=async (req:any,resp:Response)=>{

    const id=req.body.id;
    const familiar=await Familiar.findByPk(id);
    if(familiar && id){
        resp.json(familiar);
    } else {
        resp.status(404).json({
            msg:`No existe una empresa con el id ${req.body.id}`
        });
    }
    
};

export const getFamiliarPorAfiliado=async (req:any,resp:Response)=>{

    const nro=req.body.nroAfiliado;
    const familiares= await Familiar.findAll({
        where:{
            nroAfiliado:nro
        }
    });
    if(familiares && nro){
        resp.json(familiares);
    } else {
        resp.status(404).json({
            msg:`No existe una empresa con el id ${req.body.id}`
        });
    }
    
};

export const crearFamiliar=async(req:Request,resp:Response)=>{

    const {body}=req;

    try{

        const existeDni=await Familiar.findOne({
            where:{
                dni:body.dni
            }
        });
        if(existeDni){

            return resp.status(400).json({

                msg:'Existe un familiar con ese nro de documento '+body.dni
            });
        }


        const familiar=Familiar.build(body);
        
        await familiar.save();

      

        resp.json(familiar);



    }catch(error){

        console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
    }
   
};