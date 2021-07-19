import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router
    .route("/")
    .post()
    .get()

router
    .route("/:userId")
    .get(userCtrl.compareId)

export default router;