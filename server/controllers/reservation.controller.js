import axios from 'axios'
import { Reservation,Theater } from '../db/index.js'
import sequelize from 'sequelize'
const { Op } = sequelize

const findReservation = async (req,res) => {
    const {timetable} = req.body
    try {
        const reservedSeats = await Reservation.findAll({
            where: {
                timetable:timetable
            }
        })
        res.json(reservedSeats)
    } catch (error) {
        return res.status(500).send(error.message || "이미 예매되어있는 좌석을 찾는 중 오류발생")
    }
}

export default {findReservation}