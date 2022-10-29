import Server from "./classes/server";
import userRouter from './routes/usuario';

const server=new Server();

//Rutas de mi aplicación
server.app.use('/user',userRouter);



//Levantar express
server.start(()=>{

    console.log(`Servidor corriendo ${ server.port }!!! `);
});

console.log("Se ha levantado el servidor. Con servicios");

