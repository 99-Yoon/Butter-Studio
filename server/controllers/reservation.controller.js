import axios from 'axios'
import { Movie, Reservation, Theater } from '../db/index.js'
import sequelize from 'sequelize'
const { Op } = sequelize

const findReservedSeats = async (req, res) => {
    const { timetable } = req.body
    try {
        const reservedSeats = await Reservation.findAll({
            where: {
                timetable: timetable
            }
        })
        res.json(reservedSeats)
    } catch (error) {
        res.status(500).send(error.message || "이미 예매되어있는 좌석을 찾는 중 오류발생")
    }
}
const findReservation = async (req, res) => {
    const { user } = req.body
    try {
        const reservation = await Reservation.findAll({
            where: {
                user: user
            }
        })
        res.json(reservation)
    } catch (error) {
        res.status(500).send(error.message || "예매 내역들을 찾는 중 오류발생")
    }
}
const findOneReservation = async (req, res) => {
    const { userType, user } = req.body
    try {
        const reservation = await Reservation.findAll({
            where: {
                userType: userType,
                user: user
            },
        })
        // console.log(reservation)
        res.json(reservation)
    } catch (error) {
        res.status(500).send(error.message || "예매 내역을 찾는 중 오류 발생")
    }
}
const saveReservation = async (req, res) => {
    const { movieId, selectedTheater, timetable, payment, user, userType } = req.body
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