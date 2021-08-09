import express from "express";
import movieCtrl from "../controllers/movie.controller.js";
import reservationCtrl from "../controllers/reservation.controller.js";

const router = express.Router();


router.route('/findreservation')
    .post(reservationCtrl.findReservedSeats)
    .get(reservationCtrl.findReservation)

router.route('/findonereservation')
    .get(reservationCtrl.findOneReservation, movieCtrl.getMovieById)

router.route('/save')
    .post(reservationCtrl.saveReservation)

export default router;