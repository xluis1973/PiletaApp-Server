import { Request, response, Response } from "express";
import Familiar from "../models/familiar.model";
import { Op } from "sequelize";




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

    const nro=req.query.nroAfiliado;
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

        body.foto="/upload/"+nombreArchivo,foto;
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

export const actualizarFamiliar=async(req:Request,resp:Response)=>{

    const {body}=req;
    console.log("foto familiar ",body.foto);

    try{

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
        const familiar=await Familiar.update(body,{
            where: {
                dni: body.dni,
                
            }});
        
      

        resp.json(familiar);



    }catch(error){

        console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
    }
   
};

export const borrarFamiliarPorNro=async (req:Request,resp:Response)=>{

    const nro=req.query.nroAfiliado;
    const doc=req.query.dni;
    console.log("parametros ",req.query);
  
  
           

        const familia= await Familiar.destroy({
            where:{
                [Op.and]:{

                nroAfiliado:nro,
                dni:doc 
                 
             }}
            });

            console.log(familia);
       

        if(familia){
            resp.json(familia);
        }else{
            resp.status(404).json({
                msg:`No existe un Titular con ese nro ${req.body.nroAfiliado}`
            });
        }
    
    
   
};