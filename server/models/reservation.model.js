import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const ReservationModel = (sequelize) => {
    const Reservation = sequelize.define(
        "reservation",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            movieId: {
                type: DataTypes.INTEGER,
            },
            row: {
                type: DataTypes.INTEGER,
            },
            col: {
                type: DataTypes.INTEGER,
            },
            userType: {
                type: DataTypes.STRING,
            },
            user: {
                type: DataTypes.INTEGER,
            },
            payment: {
                type: DataTypes.STRING,
            },
            totalFee: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "reservations"
        }
    );
    return Reservation;
};

export default ReservationModel;