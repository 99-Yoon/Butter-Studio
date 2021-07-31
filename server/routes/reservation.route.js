import express from "express";
import ReservationCtrl from "../controllers/reservation.controller.js";

const router = express.Router();


router.route('/findreservation')
    .post(ReservationCtrl.findReservation)

router.route('/save')
    .post(ReservationCtrl.saveReservation)
    
export default router;