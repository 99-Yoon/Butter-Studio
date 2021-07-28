import express from "express";
import EmailCtrl from '../controllers/email.controller.js'

const router = express.Router();

router.route("/send")
    .post(EmailCtrl.SendMail)

export default router