import jwt from "jsonwebtoken";
import { Movie, Reservation, Theater, TheaterType, TimeTable } from '../db/index.js'
import config from '../config/app.config.js'

const findReservedSeats = async (req, res) => {
    try {
        const { timeTable } = req.body
        console.log("타임테이블===============", timeTable)
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
            },
            include: [Theater, TimeTable]
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
        console.log(id, role);
        const reservation = await Reservation.findAll({
            where: {
                user: id,
                userType: role
            },
            include:[TimeTable, Theater]
        });
        req.reservation = reservation;
        next();
    } catch (error) {
        res.status(500).send(error.message || "예매 내역을 찾는 중 오류 발생")
    }
}
const saveReservation = async (req, res) => {
    try {
        const { movieId, theaterId, timetableId, payment, user, userType, totalFee } = req.body
        const rows = req.body.selectedSeats.map(el => el.split('-')[0])
        const cols = req.body.selectedSeats.map(el => el.split('-')[1])
        for (let index = 0; index < rows.length; index++) {
            const reservation = await Reservation.create({
                user: user,
                userType: userType,
                movieId: movieId,
                row: rows[index],
                col: cols[index],
                timetableId: timetableId,
                theaterId: theaterId,
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

const saveTid = async (req, res) => {
    try {
        const { tid } = req.body
        const token = req.cookies.butterStudio;
        const { id, role } = jwt.verify(token, config.jwtSecret);
        await Reservation.update({ tid: tid }, {
            where: {
                userType: role,
                user: id
            }
        })
        res.json({ message: 'Tid 저장 OK' })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message || "예매DB에 Tid 저장 실패")
    }
}

const deleteReservation = async(req,res)=>{
    try {
        const token = req.cookies.butterStudio;
        const { id, role } = jwt.verify(token, config.jwtSecret);
        await Reservation.destroy({
            where: {
                userType: role,
                user: id
            }
          });
        res.json({ message: '결제실패로 인한 예매DB삭제' })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message || "예매DB 삭제실패")
    }
}

export default {
    findReservedSeats,
    findReservation,
    findOneReservation,
    saveReservation,
    saveTid,
    deleteReservation
}