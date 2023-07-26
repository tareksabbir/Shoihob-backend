import express from 'express'
import { UserDataController } from './User.controller'

const router = express.Router()

router.post('/create-user', UserDataController.createUserDataController)
// router.patch('/:id', UserDataController.updateUserDataController)
// router.get('/', UserDataController.getUserData)
// router.get('/details', UserDataController.getAllUserDataController)
// router.delete('/:id', UserDataController.deleteSingleUserDataController)
// router.get('/:id', UserDataController.getSingleUserDataController)

export const UserRoutes = router
