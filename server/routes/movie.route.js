import express from "express";
import movieCtrl from "../controllers/movie.controller.js";

const router = express.Router();

router
    .route("/")
    .post(movieCtrl.comparePopularMovie)
    .get(movieCtrl.comparePopularMovie)

router
    .route("/upcomming")
    .get(movieCtrl.upcommingMovie)

export default router;