import express from 'express'
import { TurfRoutes } from '../module/TurfDetails/TurfDetails.route'
import { TurfBookingRoutes } from '../module/TurfBooking/TurfBooking.route'
import { UserRoutes } from '../module/User/User.route'
import { AdminRoutes } from '../module/Adimin/Admin.route'
import { jwtRoutes } from '../module/Auth/auth.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/turf',
    route: TurfRoutes,
  },
  {
    path: '/bookings',
    route: TurfBookingRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/jwt',
    route: jwtRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
