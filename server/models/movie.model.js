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
                type: DataTypes.INTEGER
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