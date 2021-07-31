import express from "express";
import theaterCtrl from "../controllers/theater.controller.js";

const router = express.Router();

router.route("/getInfo")
    .post(theaterCtrl.getTheaterInfo)

router
    .route("/")
    .get(theaterCtrl.getAll)
    .put(theaterCtrl.submit)
    .delete(theaterCtrl.remove)

router
    .route("/type")
    .get(theaterCtrl.getTypes)

export default router;
