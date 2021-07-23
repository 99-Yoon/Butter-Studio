import express from "express";
import cinemaCtrl from "../controllers/cinema.controller.js";

const router = express.Router();

router
    .route("/")
    .get(cinemaCtrl.getAll)
    .put(cinemaCtrl.edit)

export default router;