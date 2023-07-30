import express from 'express'
import { TurfBookingDataController } from './TurfBooking.controller'

const router = express.Router()

router.post('/', TurfBookingDataController.createTurfBookingDataController)
router.patch('/:id', TurfBookingDataController.updateTurfBookingDataController)
router.delete(
  '/:id',
  TurfBookingDataController.deleteSingleTurfBookingDataController
)
router.get(
  '/:id',

  TurfBookingDataController.getSingleTurfBookingDataController
)
router.get(
  '/',

  TurfBookingDataController.getAllTurfBookingDataController
)

export const TurfBookingRoutes = router
