import express from "express";
import userRouter from './user.route.js'
import movieRouter from './movie.route.js'

const router = express.Router();
router.use('/movie', movieRouter)
router.use('/auth', userRouter)

export default router;