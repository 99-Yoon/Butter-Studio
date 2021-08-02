import { Sequelize } from "sequelize";
import UserModel from "../models/user.model.js";
import RoleModel from "../models/role.model.js";
import MovieModel from "../models/movie.model.js";
import CinemaModel from "../models/cinema.model.js";
import TheaterModel from "../models/theater.model.js";
import TheaterTypeModel from "../models/theatertype.model.js";
import TicketFeeModel from "../models/ticketfee.model.js";
import TimeTableModel from '../models/role.model.js';
import ReservationModel from '../models/reservation.model.js';
import GuestModel from '../models/guest.model.js'
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
const Theater = TheaterModel(sequelize)
const TheaterType = TheaterTypeModel(sequelize)
const TicketFee = TicketFeeModel(sequelize)
const TimeTable = TimeTableModel(sequelize)
const Reservation = ReservationModel(sequelize)
const Guest = GuestModel(sequelize)

User.belongsTo(Role);
Role.hasOne(User);

Theater.belongsTo(TheaterType, { onDelete: 'CASCADE' });

TicketFee.belongsTo(TheaterType, { onDelete: 'CASCADE' });

export {
    sequelize,
    User,
    Role,
    Movie,
    Cinema,
    Theater,
    TheaterType,
    TicketFee,
    TimeTable,
    Reservation,
    Guest
}