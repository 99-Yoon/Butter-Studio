import express from "express";
import movieCtrl from "../controllers/movie.controller.js";

const router = express.Router();

router
    .route("/")
    .post(movieCtrl.comparePopularMovie)
    .get(movieCtrl.comparePopularMovie)

router
    .route("/all")
    .get(movieCtrl.getAllMovie,
        movieCtrl.movieforAdmin
    )

router
    .route("/search/home")
    .get(movieCtrl.findonlyTitle)

router
    .route("/search/admin")
    .get(movieCtrl.findaboutAll,
        movieCtrl.movieforAdmin
    )

router
    .route("/:movieId")
    .post(movieCtrl.create)
    .delete(movieCtrl.remove)

router
    .route('/showmovie/:category')
    .get(movieCtrl.getMovieById)

router.param('category', movieCtrl.getMovieByCategory)

export default router;