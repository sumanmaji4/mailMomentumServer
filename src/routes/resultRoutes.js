import express from 'express'
import {
  handleGetAllResulst,
  handleGetResultById,
} from '../controller/resultController.js'

const router = express.Router()

router.get('/', handleGetAllResulst)
router.get('/:id', handleGetResultById)

export default router
