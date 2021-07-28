import express from "express";
import cinemaCtrl from "../controllers/cinema.controller.js";
import ticketfeeCtrl from "../controllers/ticketfee.controller.js";

const router = express.Router();

router
    .route("/cinema")
    .get(cinemaCtrl.getAll)
    .put(cinemaCtrl.edit)

router
    .route("/ticketfee/:theaterType")
    .get(ticketfeeCtrl.getOne)

router
    .route("/ticketfee")
    .get(ticketfeeCtrl.getAll)
    .put(ticketfeeCtrl.edit)
    .delete(ticketfeeCtrl.remove)

export default router;