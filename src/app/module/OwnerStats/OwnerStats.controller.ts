// OwnerStats.controller.ts

import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import OwnerDataService from './OwnerStats.service'

export const ownerStatsController = catchAsync(
  async (req: Request, res: Response) => {
    const ownerId = req.params.id // Get ownerId from URL parameters
    const paidBookingCount = await OwnerDataService.getPaidTrueCountForOwner(
      ownerId
    )
    const UnPaidBookingCount =
      await OwnerDataService.getUnPaidTrueCountForOwner(ownerId)
    const allBookingsCount = await OwnerDataService.getAllBookingsCountForOwner(
      ownerId
    )
    const usersCount = await OwnerDataService.getUsersCount()
    const totalIncome = await OwnerDataService.getPaidSumForOwner(ownerId)
    const uniqueUsers = await OwnerDataService.getUniqueUserCountForOwner(ownerId)
    
    // ... fetch counts for other collections ...

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Collection Counts Successfully!',
      data: {
        allBookingsCount,
        paidBookingCount,
        UnPaidBookingCount,
        usersCount,
        totalIncome,
        uniqueUsers

        // ... add other counts as needed ...
      },
    })
  }
)
