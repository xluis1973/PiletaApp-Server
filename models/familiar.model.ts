import { DataTypes } from "sequelize";

import db from '../db/conection';



const Familiar =db.define('Familiar',{

    dni:{
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
    parentesco:{
        type:DataTypes.STRING
    },
    nroAfiliado:{
        type:DataTypes.INTEGER
    },
    foto:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.BOOLEAN
    },
    

},
);
 


export default Familiar;