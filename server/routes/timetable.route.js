import express from "express";
import timetableCtrl from "../controllers/timetable.controller.js";

const router = express.Router();

router
    .route("/")
    .post(timetableCtrl.submit)

export default router;