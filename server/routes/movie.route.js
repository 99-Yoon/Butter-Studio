import express from "express";
import movieCtrl from "../controllers/movie.controller.js";

const router = express.Router();

router
    .route("/")
    .post(movieCtrl.comparePopularMovie)
    .get(movieCtrl.comparePopularMovie)

router
    .route("/:movieId")
    .post(movieCtrl.create)

router
    .route('/showmovie/:category')
    .get(movieCtrl.getMovieById)

router.param('category', movieCtrl.getMovieByCategory)

export default router;