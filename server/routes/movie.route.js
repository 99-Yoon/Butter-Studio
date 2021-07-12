import express from "express";
import movieCtrl from "../controllers/movie.controller.js";

const router = express.Router();

router
    .route("/")
    .post(movieCtrl.comparePopularMovie)
    .get(movieCtrl.comparePopularMovie)



export default router;