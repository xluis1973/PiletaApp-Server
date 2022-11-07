import { Request, response, Response } from "express";
import bcrcrypt from 'bcrypt';
import { Op } from "sequelize";
import Usuario from '../models/usuario.model';
import Token from '../classes/token';


export const getUsuarios=async (req:Request,resp:Response)=>{

    const usuarios=await Usuario.findAll();

    resp.json({usuarios});
};

export const getUsuario=async (req:any,resp:Response)=>{

    const id=req.usuario._id;
    const usuario=await Usuario.findByPk(id);
    if(usuario && id){
        resp.json(usuario);
    } else {
        resp.status(404).json({
            msg:`No existe un usuario con el id ${req.body.id}`
        });
    }
    
};

export const crearUsuario=async(req:Request,resp:Response)=>{

    const {body}=req;

    try{

        const existeEmail=await Usuario.findOne({
            where:{
                email:body.email
            }
        });
        if(existeEmail){

            return resp.status(400).json({

                msg:'Existe un usuario con el email '+body.email
            });
        }

        //Encriptado de contraseña

        body.password=bcrcrypt.hashSync(body.password,10);
        const usuario=Usuario.build(body);
        
        await usuario.save();

        const tokenUser=Token.getJwtToken({
            _id:usuario.getDataValue("id"),
            nombre:usuario.getDataValue("nombre"),
            apellido:usuario.getDataValue("apellido"),
            email:usuario.getDataValue("email")
        });

        resp.json(tokenUser);



    }catch(error){

        console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
    }
   
};

export const borrarUsuario=async (req:Request,resp:Response)=>{
    const {body}=req;
    try{

        const existeUsuario=await Usuario.findByPk(body.id);
        if(!existeUsuario){
            return resp.status(400).json({

                msg:'No existe este usuario '
            });
        }
        await existeUsuario.update({estado:false});
        resp.json(existeUsuario);

}catch(error){

    console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
}

};

export const actualizarUsuario=async (req:Request,resp:Response)=>{

    const {body}=req;

    try{

        const existeUsuario=await Usuario.findByPk(body.id);
        if(!existeUsuario){
            return resp.status(400).json({

                msg:'No existe este usuario '
            });
        }

        const existeEmail=await Usuario.findOne({
            where:{
                [Op.and]:{

                    email:body.email,
                id:{
                     [Op.not]:body.id
                } }
                              
            },
        
        });
       
        if(existeEmail){

            return resp.status(400).json({

                msg:'Existe un usuario con el email '+body.email
            });
        }
    
        await existeUsuario.update(body);
        resp.json(existeUsuario);

    }catch(error){

        console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
    }
};

export const login=async (req:Request,resp:Response)=>{
    const {body}=req;
    try{

       const usuarioExiste= await Usuario.findOne({

            where:{
                email:body.email
            }
        });

        if(!usuarioExiste){
           return  resp.status(404).json({
                msg:`No existe un usuario con ese mail`
            });
        }

        if(bcrcrypt.compareSync(body.password,usuarioExiste.getDataValue("password"))){
            const tokenUser=Token.getJwtToken({
                _id:usuarioExiste.getDataValue("id"),
                nombre:usuarioExiste.getDataValue("nombre"),
                apellido:usuarioExiste.getDataValue("apellido"),
                email:usuarioExiste.getDataValue("email")
            });

            resp.json(tokenUser);
        }else {
            resp.json({
                msg:'Contraseña incorrecta'
            })
        }

}catch(error){

    console.log(error);
        resp.status(500).json({

            msg:'Hable con el administrador'

        });
}

};