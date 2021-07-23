import express from "express";
import movieRouter from "./movie.route.js";
import cinemaRouter from "./cinema.route.js";

const router = express.Router();

router.use('/movie', movieRouter)
router.use('/cinema', cinemaRouter)

export default router;