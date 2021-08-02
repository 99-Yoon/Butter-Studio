import axios from 'axios'
import { Movie, Reservation, Theater } from '../db/index.js'
import sequelize from 'sequelize'
const { Op } = sequelize

const findReservation = async (req, res) => {
    const { timetable } = req.body
    try {
        const reservedSeats = await Reservation.findAll({
            where: {
                timetable: timetable
            }
        })
        console.log(reservedSeats)
        res.json(reservedSeats)
    } catch (error) {
        res.status(500).send(error.message || "이미 예매되어있는 좌석을 찾는 중 오류발생")
    }
}

const saveReservation = async (req, res) => {
    const { movieId, selectedTheater, timetable, payment,user, userType } = req.body
    const rows = req.body.selectedSeats.map(el => el.split('-')[0])
    const cols = req.body.selectedSeats.map(el => el.split('-')[1])
    try {
        for (let index = 0; index < rows.length; index++) {
            const reservation = await Reservation.create({
                user: user,
                userType: userType,
                movieId: movieId,
                theater: selectedTheater,
                row: rows[index],
                col: cols[index],
                timetable: timetable,
                payment: payment
            })
            res.json(reservation)
        }
        const movie = await Movie.findOne({
            where: {
                movieId: movieId
            }
        })
        movie.ticket_sales++
        await movie.save();
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message || "예매DB에 저장 실패")
    }
}

export default {
    findReservation,
    saveReservation
}