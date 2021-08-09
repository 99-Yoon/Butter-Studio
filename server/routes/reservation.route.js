import express from "express";
import ReservationCtrl from "../controllers/reservation.controller.js";

const router = express.Router();


router.route('/findreservation')
    .post(ReservationCtrl.findReservedSeats)
    .get(ReservationCtrl.findReservation)

router.route('/findonereservation')
    .post(ReservationCtrl.findOneReservation)

router.route('/save')
    .post(ReservationCtrl.saveReservation)

export default router;