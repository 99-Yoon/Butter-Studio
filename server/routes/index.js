import express from "express";
import userRouter from './user.route.js'
import movieRouter from './movie.route.js'
import cinemaRouter from "./cinema.route.js";
import kakaopayRouter from "./kakaopay.route.js";
import emailRouter from './email.route.js'

const router = express.Router();

router.use('/movie', movieRouter)
router.use('/auth', userRouter)
router.use('/cinema', cinemaRouter)
router.use('/kakaopay',kakaopayRouter)
router.use('/email',emailRouter)

export default router;