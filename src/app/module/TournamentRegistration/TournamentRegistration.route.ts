import express from 'express'
import { TournamentRegistrationDataController } from './TournamentRegistration.controller'
import { verifyJWT } from '../Auth/auth.service'

const router = express.Router()

//router.patch('/:id', TournamentRegistrationDataController.updateTournamentRegistrationDataController)
router.post('/', TournamentRegistrationDataController.postTournamentRegistrationDataController)
router.post('/success', TournamentRegistrationDataController.paymentConfirmation)

router.delete(
  '/:id',
  TournamentRegistrationDataController.deleteSingleTournamentRegistrationDataController
)

router.get(
  '/:id',

  TournamentRegistrationDataController.getSingleTournamentRegistrationDataController
)
router.get(
  '/payment/details/:transactionId',

  TournamentRegistrationDataController.getPaymentDetailsController
)

router.get(
  '/email/:email',
  verifyJWT,
  TournamentRegistrationDataController.getSingleUserTournamentRegistrationDataController
)
router.get(
  '/',

  TournamentRegistrationDataController.getAllTournamentRegistrationDataController
)

export const TournamentRegistrationRoutes = router