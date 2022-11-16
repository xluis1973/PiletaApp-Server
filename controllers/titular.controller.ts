import { Request, response, Response } from "express";
import path from 'path';
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

export const getTitularPorNro=async (req:Request,resp:Response)=>{

    const nro=req.query.nroAfiliado;
    console.log("parametros ",req.query);
  
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

        body.foto="/upload/"+nombreArchivo,foto;

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
export const actualizarTitular=async(req:Request,resp:Response)=>{

    const {body}=req;

    try{

        
        console.log("Previo");
        var nombreArchivo:string="";
        if(body.foto!=""){
            var foto=body.foto;
            var fs=require("fs");
             nombreArchivo=""+body.nroAfiliado+""+body.dni+".jpg";
             
           await fs.writeFile("public/upload/"+nombreArchivo,foto,'base64',(err:any)=>{

                if (err)
                 {   console.log("error", err);}
                else {
                        console.log("Archivo guardado satisfactoriamente\n");
                        
                        
                }

            });
           
            
        }

        body.foto="/upload/"+nombreArchivo,foto;

        const titular=await Titular.update(body,{
            where: {
                nroAfiliado: body.nroAfiliado,
                
            }});
        
        
     

      

        resp.json(titular);
        



    }catch(error){

        console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
    }
   
    
};


