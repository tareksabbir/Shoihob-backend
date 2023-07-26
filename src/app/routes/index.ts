import express from 'express'
import { TurfRoutes } from '../module/TurfDetails/TurfDetails.route'
import { TurfBookingRoutes } from '../module/TurfBooking/TurfBooking.route'
import { UserRoutes } from '../module/User/User.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/turf',
    route: TurfRoutes,
  },
  {
    path: '/turf-booking',
    route: TurfBookingRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
