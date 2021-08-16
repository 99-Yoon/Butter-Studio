import express from "express";
import movieCtrl from "../controllers/movie.controller.js";
import reservationCtrl from "../controllers/reservation.controller.js";
import timetableCtrl from "../controllers/timetable.controller.js";
import theaterCtrl from "../controllers/theater.controller.js"
const router = express.Router();


router.route('/findreservation')
    .post(reservationCtrl.findReservedSeats)
    .get(reservationCtrl.findReservation)

router.route('/findonereservation')
    .get(
        reservationCtrl.findOneReservation,
        movieCtrl.getMovieById,
        timetableCtrl.getTimeTable,
        theaterCtrl.getTheater,
        // theaterCtrl.getTheaterType
        )

router.route('/save')
    .post(reservationCtrl.saveReservation)

router.route('/savetid')
    .post(reservationCtrl.saveTid)

router.route('/delete')
    .get(reservationCtrl.deleteReservation)

export default router;