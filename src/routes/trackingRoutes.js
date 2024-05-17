import express from 'express'
import {
  handleMailOpen,
  handleMailClick,
} from '../controller/trackingController.js'
const router = express.Router()

router.get('/open/:id', handleMailOpen)
router.get('/redirect/:id', handleMailClick)

export default router
