import Server from "./classes/server";


const server=new Server();

//Body parser
//server.app.use(bodyParser.urlencoded({extended:true}));
//server.app.use(bodyParser.json());




//Levantar express
server.start(()=>{

    console.log(`Servidor corriendo ${ server.port }!!! `);
});

console.log("Se ha levantado el servidor. Con servicios");

