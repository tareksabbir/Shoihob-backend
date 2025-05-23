// TurfDetails.routes.ts
import express from 'express'
import { TurfDataController } from './TurfDetails.controller'

const router = express.Router()

router.post('/post-turf-data', TurfDataController.createTurfDataController)
router.patch('/:id', TurfDataController.updateTurfDataController)
router.get('/',TurfDataController.getTurfData)
router.get('/details',TurfDataController.getAllTurfDataController)
router.get('/owner/:ownerId', TurfDataController.getTurfsByOwnerController) // New route
router.delete('/:id', TurfDataController.deleteSingleTurfDataController)
router.get('/:id',TurfDataController.getSingleTurfDataController)

export const TurfRoutes = router