import express from 'express'
import { AdminController } from './Admin.controller'
import { verifyJWT} from '../Auth/auth.service'
const router = express.Router()

router.post('/create-admin', AdminController.createAdminController)
router.patch('/:id', AdminController.updateAdminController)
router.delete('/:id', AdminController.deleteSingleAdminController)

router.get(
  '/email/:email',
  AdminController.getAdminByEmailController
)
router.get(
  '/:email',
  verifyJWT,
  // verifySuperAdmins,
  AdminController.isSuperAdminController
)

router.get('/:id', AdminController.getSingleAdminController)
router.get(
  '/',
  verifyJWT,
  // verifySuperAdmins,
  AdminController.getAllUserController
)

export const AdminRoutes = router
