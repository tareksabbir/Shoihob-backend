import { Request, Response } from 'express';
import UserDataService from './UserDataService'; // Import your UserDataService
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

export const userStatsController = catchAsync(
  async (req: Request, res: Response) => {
    const usersCount = await UserDataService.getUsersCount();
    const bookingCount = await UserDataService.getBookingCount();
    const adminCount = await UserDataService.getAdminCount();
    const paidSum = await UserDataService.getPaidSum();
    const totalPaidCount = await UserDataService.getPaidTrueCount();
    const totalUnPaidCount = await UserDataService.getPaidFalseCount();
    const totalTurfCount = await UserDataService.getTotalTurfCount();
    // ... fetch counts for other collections ...

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Collection Counts Successfully!',
      data: {
        usersCount,
        bookingCount,
        adminCount,
        paidSum,
        totalPaidCount,
        totalUnPaidCount,
        totalTurfCount
        // ... add other counts as needed ...
      },
    });
  }
);
