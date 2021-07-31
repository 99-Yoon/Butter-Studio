import express from "express";
import theaterCtrl from "../controllers/theater.controller.js";

const router = express.Router();

router.route("/getInfo")
    .post(theaterCtrl.getTheaterInfo)

export default router;
