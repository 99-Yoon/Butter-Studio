import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const TicketFeeModel = (sequelize) => {
    const TicketFee = sequelize.define(
        "ticketfee",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            theaterType: {
                type: DataTypes.STRING
            },
            weekdays: {
                type: DataTypes.INTEGER
            },
            weekend: {
                type: DataTypes.INTEGER
            },
            morning: {
                type: DataTypes.INTEGER
            },
            day: {
                type: DataTypes.INTEGER
            },
            night: {
                type: DataTypes.INTEGER
            },
            youth: {
                type: DataTypes.INTEGER
            },
            adult: {
                type: DataTypes.INTEGER
            },
            senior: {
                type: DataTypes.INTEGER
            },
            defaultPrice: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "ticketfees"
        }
    );
    return TicketFee;
};

export default TicketFeeModel;