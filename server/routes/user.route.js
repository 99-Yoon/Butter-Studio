import express from "express";
import userCtrl from "../controllers/user.controller.js";
import multer from "multer"

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
    .route("/signup")
    .post(userCtrl.signup)

router
    .post("/profile", upload.single("image"), userCtrl.uploadProfile)
    
router
    .route("/modify")
    .post(userCtrl.modifyUser)

router
    .route("/member")
    .get(userCtrl.getMember)

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