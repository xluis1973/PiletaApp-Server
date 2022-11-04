import {Sequelize} from 'sequelize';

const db= new Sequelize('pileta','root','',{
    host: 'localhost',
    dialect:'mysql',
    //logging:false
});

export default db;