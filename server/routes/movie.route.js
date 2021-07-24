import express from "express";
import movieCtrl from "../controllers/movie.controller.js";

const router = express.Router();

router
    .route("/")
// .post(movieCtrl.comparePopularMovie)

router.route('/showmovies/:category')
    .get(movieCtrl.getMovieById)

router.route('/movielist')
    .get(movieCtrl.getMovieList)

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

router.param('category', movieCtrl.getMovieByCategory)
export default router;