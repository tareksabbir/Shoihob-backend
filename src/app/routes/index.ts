import express from 'express'
import { TurfRoutes } from '../module/TurfDetails/TurfDetails.route'
import { TurfBookingRoutes } from '../module/TurfBooking/TurfBooking.route'
import { UserRoutes } from '../module/User/User.route'
import { AdminRoutes } from '../module/Admin/Admin.route'
import { jwtRoutes } from '../module/Auth/auth.route'
import { adminStats } from '../module/SuperAdminStats/starts.route'
import { ownerStatsRoutes } from '../module/OwnerStats/OwnerStats.route'
import { TournamentRoutes } from '../module/TournamentDetails/Tournament.route'
import { TournamentRegistrationRoutes } from '../module/TournamentRegistration/TournamentRegistration.route'

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
    path: '/stats',
    route: adminStats,
  },
  {
    path: '/ownerStats',
    route: ownerStatsRoutes,
  },
  {
    path: '/tournament-details',
    route: TournamentRoutes,
  },
  {
    path: '/tournamentRegistration',
    route: TournamentRegistrationRoutes,
  },

  {
    path: '/jwt',
    route: jwtRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
