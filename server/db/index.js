import { Sequelize } from "sequelize";
import UserModel from "../models/user.model.js";
import MovieModel from "../models/movie.model.js";
import dbConfig from "../config/db.config.js";

const sequelize = new Sequelize(
    String(dbConfig.database),
    String(dbConfig.username),
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool?.max,
            min: dbConfig.pool?.min,
            acquire: dbConfig.pool?.acquire,
            idle: dbConfig.pool?.idle,
        },
    }
);

const User = UserModel(sequelize)
const Movie = MovieModel(sequelize)

export {
    sequelize,
    User,
    Movie
}