import express from "express";
import movieCtrl from "../controllers/movie.controller.js";

const router = express.Router();

router
    .route("/")
    .post(movieCtrl.comparePopularMovie)
    .get(movieCtrl.comparePopularMovie)

router
    .route("/all")
    .get(movieCtrl.getAllMovie)

router
    .route("/search")
    .get(movieCtrl.findforKeyword)

router
    .route("/:movieId")
    .post(movieCtrl.create)
    .delete(movieCtrl.remove)

router
    .route('/showmovie/:category')
    .get(movieCtrl.getMovieById)

router.param('category', movieCtrl.getMovieByCategory)

export default router;