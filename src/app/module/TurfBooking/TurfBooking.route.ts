import express from 'express'
import { TurfBookingDataController } from './TurfBooking.controller'
import { verifyJWT } from '../Auth/auth.service'

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
  '/email/:email',
  verifyJWT,
  TurfBookingDataController.getSingleUserTurfBookingDataController
)
router.get(
  '/',

  TurfBookingDataController.getAllTurfBookingDataController
)

export const TurfBookingRoutes = router
