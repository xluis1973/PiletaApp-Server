import { Request, response, Response } from "express";
import Empresa from "../models/empresa.model";



export const getEmpresas=async (req:Request,resp:Response)=>{

    const empresas=await Empresa.findAll();
    console.log("devolviendo");

    resp.json(empresas);
};

export const getEmpresa=async (req:any,resp:Response)=>{

    const id=req.body.id;
    const empresa=await Empresa.findByPk(id);
    if(empresa && id){
        resp.json(empresa);
    } else {
        resp.status(404).json({
            msg:`No existe una empresa con el id ${req.body.id}`
        });
    }
    
};

export const getEmpresaPorNro=async (req:any,resp:Response)=>{

    const nro=req.query.nroEmpresa;
    const empresa= await Empresa.findOne({
        where:{
            nroEmpresa:nro
        }
    });
    if(empresa && nro){
        resp.json(empresa);
    } else {
        resp.status(404).json({
            msg:`No existe una empresa con el numero ${req.body.nroEmpresa}`
        });
    }
    
};

export const crearEmpresa=async(req:Request,resp:Response)=>{

    const {body}=req;

    try{

        const existeNroEmpresa=await Empresa.findOne({
            where:{
                nroEmpresa:body.nroEmpresa
            }
        });
        if(existeNroEmpresa){

            return resp.status(400).json({

                msg:'Existe una empresa con ese nro '+body.nroEmpresa
            });
        }


        const empresa=Empresa.build(body);
        
        await empresa.save();

      

        resp.json(empresa);



    }catch(error){

        console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
    }
   
};

export const actualizarEmpresa=async(req:Request,resp:Response)=>{

    const {body}=req;

    


    const empresa=await Empresa.update(body,{
        where: {
            nroEmpresa: body.nroEmpresa,
            
        }});
        
        

      

        resp.json(empresa);



   
};