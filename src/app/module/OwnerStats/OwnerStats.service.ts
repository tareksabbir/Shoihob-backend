import { TurfBookingData } from '../TurfBooking/TurfBooking.model'
import { UserData } from '../User/User.model'

export default class OwnerDataService {
  static async getUsersCount(): Promise<number> {
    const count = await UserData.countDocuments()
    return count
  }
  static async getAllBookingsCountForOwner(ownerId: string): Promise<number> {
    const count = await TurfBookingData.countDocuments({ ownerId })
    return count
  }

  static async getPaidTrueCountForOwner(ownerId: string): Promise<number> {
    const aggregateResult = await TurfBookingData.aggregate([
      {
        $match: {
          ownerId,
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

    return 0 // Return 0 if no paid bookings for the owner
  }
  static async getUnPaidTrueCountForOwner(ownerId: string): Promise<number> {
    const aggregateResult = await TurfBookingData.aggregate([
      {
        $match: {
          ownerId,
          paid: false, // Only include documents where 'paid' is true
        },
      },
      {
        $count: 'paidTrueCount', // Count the number of documents where 'paid' is true
      },
    ])

    if (aggregateResult.length > 0) {
      return aggregateResult[0].paidTrueCount
    }

    return 0 // Return 0 if no paid bookings for the owner
  }
  static async getPaidSumForOwner(ownerId: string): Promise<number> {
    const aggregateResult = await TurfBookingData.aggregate([
      {
        $match: {
          ownerId,
          paid: true, // Only include documents where 'paid' is true
        },
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

    return 0
  }
  static async getUniqueUserCountForOwner(ownerId: string): Promise<number> {
    const uniqueUserCount = await TurfBookingData.aggregate([
      {
        $match: {
          ownerId,
          paid: true, // Only include paid bookings
        },
      },
      {
        $group: {
          _id: '$userId', // Group by userId to get unique users
        },
      },
      {
        $group: {
          _id: null,
          uniqueUserCount: { $sum: 1 }, // Count the number of unique users
        },
      },
    ])

    if (uniqueUserCount.length > 0) {
      return uniqueUserCount[0].uniqueUserCount
    }

    return 0
  }
 
}
