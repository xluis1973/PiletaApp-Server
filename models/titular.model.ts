import { DataTypes } from "sequelize";

import db from '../db/conection';



const Titular =db.define('Titular',{

    nroAfiliado:{
        type:DataTypes.INTEGER
    },

    dni:{
        type:DataTypes.INTEGER
    },
    nroEmpresa:{
        type:DataTypes.INTEGER
    },

    apellido: {
        type:DataTypes.STRING
    },
    nombre :{
        type:DataTypes.STRING
    },
    fechaNacimiento:{
        type:DataTypes.DATE
    },
      
    foto:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.BOOLEAN
    },
    telefono:{
        type:DataTypes.STRING
    }
    

},
);
 


export default Titular;