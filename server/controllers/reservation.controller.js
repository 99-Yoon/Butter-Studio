import jwt from "jsonwebtoken";
import { Movie, Reservation, Theater, TimeTable } from '../db/index.js'
import config from '../config/app.config.js'

const findReservedSeats = async (req, res) => {
    try {
        const { timeTable } = req.body
        console.log("타임테이블===============",timeTable)
        const reservedSeats = await Reservation.findAll({
            where: {
                timetableId: timeTable
            }
        })
        res.json(reservedSeats)
    } catch (error) {
        res.status(500).send(error.message || "이미 예매되어있는 좌석을 찾는 중 오류발생")
    }
}
const findReservation = async (req, res) => {
    try {
        const token = req.cookies.butterStudio;
        const { id } = jwt.verify(token, config.jwtSecret);
        const reservation = await Reservation.findAll({
            where: {
                user: id
            }
        })
        res.json(reservation)
    } catch (error) {
        res.status(500).send(error.message || "예매 내역들을 찾는 중 오류발생")
    }
}
const findOneReservation = async (req, res, next) => {
    try {
        const token = req.cookies.butterStudio;
        const { id, role } = jwt.verify(token, config.jwtSecret);
        const reservation = await Reservation.findAll({
            where: {
                userType: role,
                user: id
            },
            include: [Theater, TimeTable]
        });
        console.log(reservation);
        req.reservation = reservation
        next()
        // res.json(reservation);
    } catch (error) {
        res.status(500).send(error.message || "예매 내역을 찾는 중 오류 발생")
    }
}
const saveReservation = async (req, res) => {
    try {
        const { movieId, selectedTheater, timetable, payment, user, userType, totalFee } = req.body
        const rows = req.body.selectedSeats.map(el => el.split('-')[0])
        const cols = req.body.selectedSeats.map(el => el.split('-')[1])
        for (let index = 0; index < rows.length; index++) {
            const reservation = await Reservation.create({
                user: user,
                userType: userType,
                movieId: movieId,
                theaterId: selectedTheater,
                row: rows[index],
                col: cols[index],
                timetableId: timetable,
                payment: payment,
                totalFee: totalFee,
            })
        }
        const movie = await Movie.findOne({
            where: {
                movieId: movieId
            }
        })
        movie.ticket_sales++
        await movie.save();
        res.json({ message: '200 OK' })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message || "예매DB에 저장 실패")
    }
}

export default {
    findReservedSeats,
    findReservation,
    findOneReservation,
    saveReservation
}