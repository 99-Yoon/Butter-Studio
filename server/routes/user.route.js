import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router
    .route("/user")
    .get(userCtrl.getUser)

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
    .route("/modify")
    .post(userCtrl.modifyUser)

router
    .route("/nickname/:id")
    .get(userCtrl.getNickName)

router
    .route("/pw/:pw")
    .get(userCtrl.comparePw)

router
    .route("/:userId")
    .get(userCtrl.compareId)

router
    .route("/:id/:token")    
    .get(userCtrl.confirmMbnum)

export default router;