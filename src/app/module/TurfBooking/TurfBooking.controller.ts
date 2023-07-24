import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { TurfBookingDataService } from './TurfBooking.service'
import { ITurfBookingData } from './TurfBooking.interface'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { pick } from '../../../shared/pick'
import { turfBookingDataFilterableFields } from './TurfBooking.constant'
import { paginationFields } from '../../../constance/pagination'

const createTurfBookingDataController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...turfBookingData } = req.body
    const result = await TurfBookingDataService.createTurfBookingDataService(
      turfBookingData
    )

    if (result.success === false) {
      return sendResponse<ITurfBookingData>(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: result.message,
        data: null,
      })
    }

    sendResponse<ITurfBookingData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Turf Details Posted Successfully!',
      data: result.data,
    })
  }
)

const getAllTurfBookingDataController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, turfBookingDataFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await TurfBookingDataService.getAllTurfBookingDataService(
      filters,
      paginationOptions
    )

    sendResponse<ITurfBookingData[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Turf Booking Data retrieved successfully !',
      meta: result.meta,
      data: result.data,
    })
  }
)
const getSingleTurfBookingDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await TurfBookingDataService.getSingleTurfBookingDataService(
      id
    )

    sendResponse<ITurfBookingData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Turf Booking Data retrieved successfully !',
      data: result,
    })
  }
)
const updateTurfBookingDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData = req.body

    const result = await TurfBookingDataService.updateTurfBookingData(
      id,
      updateData
    )

    sendResponse<ITurfBookingData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Turf Booking Data updated successfully !',
      data: result,
    })
  }
)

const deleteSingleTurfBookingDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await TurfBookingDataService.deleteTurfBookingData(id)

    sendResponse<ITurfBookingData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Semesters deleted successfully !',
      data: result,
    })
  }
)

export const TurfBookingDataController = {
  createTurfBookingDataController,
  getAllTurfBookingDataController,
  getSingleTurfBookingDataController,
  updateTurfBookingDataController,
  deleteSingleTurfBookingDataController,
}
