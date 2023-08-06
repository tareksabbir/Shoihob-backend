import express from 'express'
import { TurfBookingDataController } from './TurfBooking.controller'
import { verifyJWT } from '../Auth/auth.service'

const router = express.Router()

router.patch('/:id', TurfBookingDataController.updateTurfBookingDataController)
router.post('/', TurfBookingDataController.createTurfBookingDataController)
router.post('/success', TurfBookingDataController.paymentConfirmation)

router.delete(
  '/:id',
  TurfBookingDataController.deleteSingleTurfBookingDataController
)

router.get(
  '/:id',

  TurfBookingDataController.getSingleTurfBookingDataController
)
router.get(
  '/payment/details/:transactionId',

  TurfBookingDataController.getPaymentDetailsController
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
