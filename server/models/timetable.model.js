import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const TimeTableModel = (sequelize) => {
    const TimeTable = sequelize.define(
        "timetable",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            theater: {
                type: DataTypes.INTEGER,
            },
            movieId: {
                type: DataTypes.INTEGER,
            },
            title: {
                type: DataTypes.STRING,
            },
            runtime: {
                type: DataTypes.INTEGER,
            },
            release_date: {
                type: DataTypes.STRING
            },
            start_date: {
                type: DataTypes.DATE,
                defaultValue: new Date(0)
            },
            end_date: {
                type: DataTypes.DATE,
                defaultValue: new Date(0)
            },
            time: {  
                type: DataTypes.TIME,
            },
        },
        {
            // timestamps: true,
            freezeTableName: true,
            tableName: "timetables"
        }
    );
    return TimeTable;
};

export default TimeTableModel;