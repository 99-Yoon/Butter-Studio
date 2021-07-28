import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const CinemaModel = (sequelize) => {
    const Cinema = sequelize.define(
        "cinema",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cinemaName: {
                type: DataTypes.STRING,
            },
            transportation: {
                type: DataTypes.TEXT
            },
            parking: {
                type: DataTypes.TEXT
            },
            address: {
                type: DataTypes.STRING
            },
            moreFeeInfo: {
                type: DataTypes.TEXT
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "cinemas"
        }
    );
    return Cinema;
};

export default CinemaModel;