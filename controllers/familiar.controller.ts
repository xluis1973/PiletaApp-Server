import { Request, response, Response } from "express";
import Familiar from "../models/familiar.model";




export const getFamiliares=async (req:Request,resp:Response)=>{

    const familiares=await Familiar.findAll();
    console.log("Todos ",req.body);

    resp.json({familiares});
};

export const getFamiliar=async (req:any,resp:Response)=>{

    const id=req.body.id;
    const familiar=await Familiar.findByPk(id);
    if(familiar && id){
        resp.json(familiar);
    } else {
        resp.status(404).json({
            msg:`No existe un familiar con el id ${req.body.id}`
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
    console.log("foto familiar ",body.foto);

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

        console.log("Previo");
        var nombreArchivo:string="";
        if(body.foto!=""){
            var foto=body.foto;
            var fs=require("fs");
             nombreArchivo=""+body.nroAfiliado+""+body.dni+".jpg";
            fs.writeFile("public/upload/"+nombreArchivo,foto,'base64',(err:any)=>{

                if (err)
                {   console.log("error", err);}
               else {
                       console.log("Archivo guardado satisfactoriamente\n");
                       
                       
               }

            });
            
        }

        body.foto="public/upload/"+nombreArchivo,foto;
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