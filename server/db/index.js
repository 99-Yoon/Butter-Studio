import { Sequelize } from "sequelize";
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

export {
    sequelize,
}