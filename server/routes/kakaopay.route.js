import express from 'express'
import kakaopayCtrl from '../controllers/kakaopay.controller.js'

const router = express.Router()

router.route('/success')
  .post(kakaopayCtrl.success)

router.route('/fail')
  .get(kakaopayCtrl.fail)

router.route('/cancel')
  .get(kakaopayCtrl.cancel)

router.route('/test/single')
  .post(kakaopayCtrl.singleTest)

export default router
