import bcrypt from "bcryptjs";
import Sequelize from "sequelize";
// import { ROLE_NAME } from "./role.model.js";

const { DataTypes } = Sequelize;

const UserModel = (sequelize) => {
    const User = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            nickname: {
                type: DataTypes.STRING,
            },
            birth: {
                type: DataTypes.INTEGER,
            },
            phoneNumber: {
                type: DataTypes.INTEGER
            },
            // role: {
            //     type: DataTypes.ENUM({
            //         values: Object.values(ROLE_NAME),
            //       }),
            // }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "users"
            // defaultScope: {
            //     attributes: { exclude: ["password"] },
            // },
            // scopes: {
            //     withPassword: {
            //         attributes: { include: ["password"] },
            //     },
            // },
        }
    );
    return User
};

export default UserModel