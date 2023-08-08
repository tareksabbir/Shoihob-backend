import express from 'express'
import { TournamentDataController } from './Tournament.controller'


const router = express.Router()

router.post('/post-Tournament-data',TournamentDataController.createTournamentDataController)
router.patch('/:id', TournamentDataController.updateTournamentDataController)
router.delete('/:id', TournamentDataController.deleteSingleTournamentDataController)
router.get('/:id',TournamentDataController.getSingleTournamentDataController)
router.get('/',TournamentDataController.getAllTournamentDataController)

export const TournamentRoutes = router