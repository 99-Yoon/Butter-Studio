import express from "express";
import movieCtrl from "../controllers/movie.controller.js";

const router = express.Router();

router
    .route("/")
// .post(movieCtrl.comparePopularMovie)

router.route('/showmovie/:category')
    .get(movieCtrl.getMovieById)

router.route('/movielist')
    .get(movieCtrl.getMovieList)

router
    .route("/:movieId")
    .post(movieCtrl.create)

router.param('category', movieCtrl.getMovieByCategory)

export default router;