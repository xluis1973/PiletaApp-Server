import Server from "./classes/server";

const server=new Server();

//Levantar express

server.start(()=>{

    console.log(`Servidor corriendo ${ server.port }!!! `);
});

console.log("Se ha levantado el servidor");