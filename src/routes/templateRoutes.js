import express from 'express'
import {
  handleCreateTemplate,
  handleGetTemplate,
  handleUpdateTemplate,
  handleDeleteTemplate,
  handleGetAllTemplates,
} from '../controller/templateController.js'

const router = express.Router()

// router.post('/', handleCreateTemplate)
router.route('/').get(handleGetAllTemplates).post(handleCreateTemplate)
router
  .route('/:id')
  .get(handleGetTemplate)
  .patch(handleUpdateTemplate)
  .delete(handleDeleteTemplate)

export default router
