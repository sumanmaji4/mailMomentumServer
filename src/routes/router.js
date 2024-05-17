import express from 'express'
import templateRouter from './templateRoutes.js'
import sendMailRouter from './sendMailRoutes.js'
import resultRouter from './resultRoutes.js'
import trackingRouter from './trackingRoutes.js'

const router = express.Router()

router.use('/template', templateRouter)
router.use('/send', sendMailRouter)
router.use('/result', resultRouter)
router.use('/track', trackingRouter)

export default router
