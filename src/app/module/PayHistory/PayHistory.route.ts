import express from 'express'
import { PayHistoryController } from './PayHistory.controller'

const router = express.Router()

router.post('/post-pay-data', PayHistoryController.createPayHistoryController)
router.patch('/:id', PayHistoryController.updatePayHistoryController)
router.get(
  '/email/:email',
  PayHistoryController.getSingleUserPayHistoryDataController
)
router.get('/', PayHistoryController.getAllPayHistoryController)
router.delete('/:id', PayHistoryController.deleteSinglePayHistoryController)
router.get('/:id', PayHistoryController.getSinglePayHistoryController)

export const PayHistoryRoutes = router
