import express from 'express'
import { UserDataController } from './User.controller'
import { verifyJWT } from '../Auth/auth.service'

const router = express.Router()

router.post('/create-user', UserDataController.createUserDataController)

router.patch('/:id', UserDataController.updateUserDataController)
router.delete('/:id', UserDataController.deleteSingleUserDataController)
router.get('/email/:email', UserDataController.getSingleUserDataController)
router.get(
  '/:email',
  verifyJWT,
  // verifyAdmins,
  UserDataController.isAdminController
)
router.get(
  '/',
  verifyJWT,
  // verifyAdmins,
  UserDataController.getAllUserController
)

export const UserRoutes = router
