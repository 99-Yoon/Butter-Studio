import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const ConfirmNumModel = (sequelize) => {
    const ConfirmNum = sequelize.define(
        "confirmnum",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            confirmNum: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING
            },
            startTime: {
                type: DataTypes.STRING
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "confirmnum"
        }
    );
    return ConfirmNum;
};

export default ConfirmNumModel;