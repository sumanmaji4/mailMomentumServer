import express from 'express'
import { handledSendMail } from '../controller/sendMailController.js'

const router = express.Router()

router.post('/', handledSendMail)

export default router
