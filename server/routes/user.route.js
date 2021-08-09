import express from "express";
import multer from "multer";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer({
    dest: "upload/"
})

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
    .route("/guest")
    .post(userCtrl.guestLogin)

router
    .route("/signup")
    .post(userCtrl.signup)

router
    .route("/profile")
    .post(
        upload.single("image"),
        userCtrl.uploadProfile
    )

router
    .route("/modify")
    .post(userCtrl.modifyUser)

router
    .route("/member")
    .get(userCtrl.getMember)

router
    .route("/num")
    .post(userCtrl.confirmNum)

router
    .route("/pw/:pw")
    .get(userCtrl.comparePw)

router
    .route("/phone/:phone")
    .post(userCtrl.confirmMbnum)

router
    .route('/getuserinfo')
    .post(userCtrl.getUserInfo)

router
    .route('/guest/save')
    .post(userCtrl.saveGuestInfo)

router
    .route('/guestinfo/:guestId')
    .get(userCtrl.getGuestInfo)

export default router;