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

router
    .route("/:id/:token")
    .get(userCtrl.confirmMbnum)

// router
//     .route("/:iddd")
//     .get(userCtrl.getNickName)

router.route('/getuserinfo')
    .post(userCtrl.getUserInfo)

export default router;