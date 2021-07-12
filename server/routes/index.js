import express from "express";
import movieRouter from './movie.route.js'

const router = express.Router();
router.use('/movie', movieRouter)

export default router;