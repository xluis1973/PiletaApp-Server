import { DataTypes } from "sequelize";

import db from '../db/conection';



const Empresa =db.define('Empresa',{
  

    nroEmpresa: {
        type:DataTypes.INTEGER
    },
    razonSocial :{
        type:DataTypes.STRING
    },
    
    estado:{
        type:DataTypes.BOOLEAN
    },
    

},
);
 


export default Empresa;