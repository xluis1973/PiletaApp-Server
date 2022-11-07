import { DataTypes } from "sequelize";
import bcrcrypt from 'bcrypt';
import db from '../db/conection';
import { prototype } from "mysql2/typings/mysql/lib/Connection";


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
    },
    

},
);
 


export default Usuario;