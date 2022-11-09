import express from 'express';
import db from '../db/conection';
import userRouter from '../routes/usuario';
import cors from 'cors';
import bodyParser from "body-parser";



export default class Server{

    public app:express.Application;
    public port:number=3000;
    private apiPath={
        usuarios:'/api',

    }


    constructor(){
        this.dbConnector();
        this.app=express();
        this.middelware();
        this.routes();
    }


    middelware(){
        //CORS
        this.app.use(cors());

        //Lectura del Body
       // this.app.use(express.json);
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(bodyParser.json());
        //Carpeta publica
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.apiPath.usuarios,userRouter);
    }
    async dbConnector(){
       try {

        await db.authenticate();
        console.log("conectado ");
        
       } catch (error:any) {
        console.log("Error");
        throw new Error(error);
       }
    }


    start(callback:any) {
     
        this.app.listen(this.port,callback);
    }

}