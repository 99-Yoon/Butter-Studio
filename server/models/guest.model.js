import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const GuestModel = (sequelize) => {
    const Guest = sequelize.define(
        "guest",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            email: {
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
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "guests",
        }
    );

    return Guest
};

export default GuestModel