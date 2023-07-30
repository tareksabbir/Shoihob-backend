import express from 'express'
import { tokenJWTService } from './auth.service'

const router = express.Router()

router.post('/', tokenJWTService.jwtService)

export const jwtRoutes = router
