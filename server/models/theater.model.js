import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const TheaterModel = (sequelize) => {
    const Theater = sequelize.define(
        "theater",
        {
            theaterNum: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            rows: {
                type: DataTypes.INTEGER,
            },
            columns: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "theaters"
        }
    );
    return Theater;
};

export default TheaterModel;