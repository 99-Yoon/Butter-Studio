import express from "express";
import timetableCtrl from "../controllers/timetable.controller.js";

const router = express.Router();

router
    .route("/")
    .get(timetableCtrl.getAll)
    .post(timetableCtrl.submit)

router
    .route("/:timeId")
    .delete(timetableCtrl.remove)

export default router;