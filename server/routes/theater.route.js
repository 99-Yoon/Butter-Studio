import express from "express";
import theaterCtrl from "../controllers/theater.controller.js";

const router = express.Router();

router
    .route("/")
    .get(theaterCtrl.getAll)
    .put(theaterCtrl.submit)

router
    .route("/type")
    .get(theaterCtrl.getTypes)

router
    .route("/:theaterId")
    .get(theaterCtrl.getOne)
    .delete(theaterCtrl.remove)

export default router;