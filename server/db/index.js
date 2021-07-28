import { Sequelize } from "sequelize";
import UserModel from "../models/user.model.js";
import RoleModel from "../models/role.model.js";
import MovieModel from "../models/movie.model.js";
import CinemaModel from "../models/cinema.model.js";
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
const Role = RoleModel(sequelize)
const Movie = MovieModel(sequelize)
const Cinema = CinemaModel(sequelize)

User.belongsTo(Role);
Role.hasOne(User);

export {
    sequelize,
    User,
    Role,
    Movie,
    Cinema
}