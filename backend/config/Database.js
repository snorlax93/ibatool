import {Sequelize} from "sequelize";

const db = new Sequelize('db','user','password',{
    host: "localhost",
    dialect: "mysql"
});

export default db;