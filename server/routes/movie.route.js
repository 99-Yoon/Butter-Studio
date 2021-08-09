import express from "express";
import movieCtrl from "../controllers/movie.controller.js";

const router = express.Router();

router
    .route("/")
    .get(movieCtrl.getListfromDB)


router
    .route('/movielist/:category')
    .get(movieCtrl.getMovieList)

router
    .route("/all")
    .get(
        movieCtrl.getAllMovie,
        movieCtrl.movieforAdmin
    )

router
    .route("/search/home")
    .get(movieCtrl.findonlyTitle)

router
    .route("/search/admin")
    .get(
        movieCtrl.findaboutAll,
        movieCtrl.movieforAdmin
    )

router
    .route("/:movieId")
    .post(movieCtrl.create)
    .delete(movieCtrl.remove)


export default router;