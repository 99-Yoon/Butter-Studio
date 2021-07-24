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
            nickname: {
                type: DataTypes.STRING,
            },
            birth: {
                type: DataTypes.STRING,
            },
            phoneNumber: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING,
            },
            roleId: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "users",
            defaultScope: {
                attributes: { exclude: ["password"] },
            },
            scopes: {
                withPassword: {
                    attributes: { include: ["password"] },
                },
            },
        }
    );

    User.beforeSave(async (user) => {
        if (!user.changed("password")) {
            return;
        }

        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }
    });

    User.prototype.comparePassword = async function (plainPassword) {
        const passwordMatch = await bcrypt.compare(
            plainPassword,
            this.password
        );
        return passwordMatch;
    };

    return User
};

export default UserModel