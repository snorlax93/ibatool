import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    userName:{
        type: DataTypes.STRING
    },
    emailAddress:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refreshToken:{
        type: DataTypes.TEXT
    },
    userLevel: {
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

export default Users;