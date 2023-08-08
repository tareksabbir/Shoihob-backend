/* eslint-disable no-undef */
// ... import other models as needed ...

import { Admin } from '../Admin/Admin.model'
import { TurfBookingData } from '../TurfBooking/TurfBooking.model'
import { TurfData } from '../TurfDetails/TurfDetails.model'
import { UserData } from '../User/User.model'

export default class UserDataService {
  static async getUsersCount(): Promise<number> {
    const count = await UserData.countDocuments()
    return count
  }
  static async getBookingCount(): Promise<number> {
    const count = await TurfBookingData.countDocuments()
    return count
  }
  static async getAdminCount(): Promise<number> {
    const count = await Admin.countDocuments()
    return count
  }
  static async getPaidSum(): Promise<number> {
    const aggregateResult = await TurfBookingData.aggregate([
      {
        $match:
          // Exclude documents where 'paid' field is not present
          { paid: true }, // Include documents where 'paid' is true
      },
      {
        $group: {
          _id: null,
          totalPaid: { $sum: '$price' },
        },
      },
    ])

    if (aggregateResult.length > 0) {
      return aggregateResult[0].totalPaid
    }

    return 0 // Return 0 if no bookings
  }
  static async getPaidTrueCount(): Promise<number> {
    const aggregateResult = await TurfBookingData.aggregate([
      {
        $match: {
          paid: true, // Only include documents where 'paid' is true
        },
      },
      {
        $count: 'paidTrueCount', // Count the number of documents where 'paid' is true
      },
    ])

    if (aggregateResult.length > 0) {
      return aggregateResult[0].paidTrueCount
    }

    return 0 // Return 0 if no paid bookings
  }
  static async getPaidFalseCount(): Promise<number> {
    const aggregateResult = await TurfBookingData.aggregate([
      {
        $match: {
          paid: false, // Only include documents where 'paid' is false
        },
      },
      {
        $count: 'paidFalseCount', // Count the number of documents where 'paid' is false
      },
    ])

    if (aggregateResult.length > 0) {
      return aggregateResult[0].paidFalseCount
    }

    return 0 // Return 0 if no bookings with paid = false
  }
  static async getTotalTurfCount(): Promise<number> {
    const totalTurfCount = await TurfData.countDocuments()
    return totalTurfCount
  }
}
