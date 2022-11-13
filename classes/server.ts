import express from 'express';
import db from '../db/conection';
import userRouter from '../routes/usuario';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import bodyParser from "body-parser";
import empresaRouter from '../routes/empresa';
import titularRouter from '../routes/titular';
import familiarRouter from '../routes/familiar';



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
        this.app.use(bodyParser.urlencoded({extended:true,limit:50000000}));
        this.app.use(bodyParser.json({limit:50000000}));
        //Carpeta publica
        this.app.use("/public/upload",express.static(__dirname+"/public/upload"));
        this.app.use(fileUpload());
    }


    routes(){
        this.app.use(this.apiPath.usuarios,userRouter);
        this.app.use(this.apiPath.usuarios,empresaRouter);
        this.app.use(this.apiPath.usuarios,titularRouter);
        this.app.use(this.apiPath.usuarios,familiarRouter);
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