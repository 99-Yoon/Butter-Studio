import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const TheaterModel = (sequelize) => {
    const Theater = sequelize.define(
        "theater",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            theaterName: {
                type: DataTypes.STRING
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