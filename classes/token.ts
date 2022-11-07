import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model';


export default class Token{

    //Esta es la semilla secreta que tengo en mi aplicación
    private static seed:string='Luis1973';
    private static caducidad:string='30d';

    constructor(){}

    static getJwtToken(payload:any):string{


        return jwt.sign({
            usuario:payload
        },this.seed,{expiresIn:this.caducidad});


    }

    static compareToken(userToken:string){

        return new Promise((resolve,reject)=>{

            jwt.verify(userToken,this.seed,(err,decoder)=>{
                if(err){
                    reject();
    
                }else {
                    resolve(decoder);
                }
            });
        });
        

    }


}