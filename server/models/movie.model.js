import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const MovieModel = (sequelize) => {
    const Movie = sequelize.define(
        "movie",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            movieId: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            ticket_sales: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0,
            },
            vote_average: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0,
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "movies"
        }
    );
    return Movie;
};

export default MovieModel;