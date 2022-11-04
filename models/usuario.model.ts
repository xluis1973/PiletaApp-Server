import { DataTypes } from "sequelize";
import db from '../db/conection';


const Usuario =db.define('Usuario',{

    apellido: {
        type:DataTypes.STRING
    },
    nombre :{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.BOOLEAN
    }

});

export default Usuario;