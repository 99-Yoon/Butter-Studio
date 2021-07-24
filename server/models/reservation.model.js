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
            theater: {
                type: DataTypes.INTEGER,
            },
            row: {
                type: DataTypes.STRING,
            },
            col: {
                type: DataTypes.INTEGER,
            },
            timetable:{
                type: DataTypes.INTEGER,
            },
            user:{
                type: DataTypes.INTEGER,
            },
            payment:{
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