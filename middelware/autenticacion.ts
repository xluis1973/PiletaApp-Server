import {Request,Response,NextFunction} from 'express';
import Token from '../classes/token';

export const verificaToken=(req:any, resp:Response,next:NextFunction)=>{

    const userToken=req.get('x-token')||'';

    Token.compareToken(userToken).then((decoder:any)=>{

        console.log("decoder",decoder);
        req.usuario=decoder.usuario;
        next();
    }).catch(err=>{

        resp.json({
            ok:false,
            msg:'El token no es correcto'
        })

    });
}