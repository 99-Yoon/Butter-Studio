import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const TheaterTypeModel = (sequelize) => {
    const TheaterType = sequelize.define(
        "theatertype",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            theaterTypeName: {
                type: DataTypes.STRING,
                unique: true
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "theatertypes"
        }
    );
    return TheaterType;
};

export default TheaterTypeModel;