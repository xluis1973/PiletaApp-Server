import { Request, response, Response } from "express";
import Titular from "../models/titular.model";


export const getTitulares=async (req:Request,resp:Response)=>{

    const titulares=await Titular.findAll();

    resp.json({titulares});
};

export const getTitular=async (req:any,resp:Response)=>{

    const id=req.body.id;
    const titular=await Titular.findByPk(id);
    if(titular && id){
        resp.json(titular);
    } else {
        resp.status(404).json({
            msg:`No existe un titular con el id ${req.body.id}`
        });
    }
    
};

export const getTitularPorNro=async (req:any,resp:Response)=>{

    const nro=req.body.nroAfiliado;
    const titular=await Titular.findOne({
        where:{
            nroAfiliado:nro
        }
    });
    if(titular && nro){
        resp.json(titular);
    } else {
        resp.status(404).json({
            msg:`No existe un Titular con ese nro ${req.body.nroAfiliado}`
        });
    }
    
};


export const crearTitular=async(req:Request,resp:Response)=>{

    const {body}=req;

    try{

        const existeNroAfiliado=await Titular.findOne({
            where:{
                nroAfiliado:body.nroAfiliado
            }
        });
        if(existeNroAfiliado){

            return resp.status(400).json({

                msg:'Existe un afiliado con ese nro '+body.nroAfiliado
            });
        }

        console.log("Previo");
        var nombreArchivo;
        if(body.foto!=""){
            var foto=body.foto;
            var fs=require("fs");
             nombreArchivo=""+body.nroAfiliado+""+body.dni+".jpg";
            fs.writeFile("public/upload/"+nombreArchivo,foto,'base64',(error:any)=>{

                console.log("Error ",error);

            });
            
        }

        body.foto="public/upload/"+nombreArchivo,foto;

        const titular=Titular.build(body);
        
        await titular.save();

      

        resp.json(titular);



    }catch(error){

        console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
    }
   
};