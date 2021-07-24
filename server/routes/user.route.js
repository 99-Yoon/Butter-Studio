import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router
    .route("/login")
    .post(userCtrl.login)

router
    .route("/logout")
    .get(userCtrl.logout)

router
    .route("/signup")
    .post(userCtrl.signup)

router
    .route("/:userId")
    .get(userCtrl.compareId)

export default router;