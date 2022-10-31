import Server from "./classes/server";
import userRouter from './routes/usuario';

const server=new Server();

//Rutas de mi aplicación
server.app.use('/user',userRouter);

// Paquete necesario para conectar a bases de datos MySQL.
var mysql = require('mysql');
// Consulta SQL.
var sql = 'SELECT * FROM usuario LIMIT 10';

// Parámetros de conexión a la base de datos.
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : 'test'
});

// Funcion que nos permite comprobar la conexión a la base de datos.
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// Funcion que nos devolverá resultados de la base de datos.
con.connect(function(err:any) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err:any, result:any) {
    if (err) throw err;

    let i:number;
    // Bucle que recore los resultados y pinta en consola.
    for(i=0; i<result.length; i++){
    	console.log("Datos: " + result[i].nombre);
    }

  });
});





//Levantar express
server.start(()=>{

    console.log(`Servidor corriendo ${ server.port }!!! `);
});

console.log("Se ha levantado el servidor. Con servicios");

