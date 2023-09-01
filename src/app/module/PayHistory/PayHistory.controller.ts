import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constance/pagination'
import { PayHistoryService } from './PayHistory.service'
import { IPayHistory } from './PayHistory.interface'
import { PayHistoryFilterableFields } from './PayHistory.constant'


const createPayHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...PayHistory } = req.body
    const result = await PayHistoryService.createPayHistoryService(PayHistory)

    sendResponse<IPayHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Turf Details Posted Successfully!',
      data: result,
    })
  }
)

const getAllPayHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, PayHistoryFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await PayHistoryService.getAllPayHistoryService(
      filters,
      paginationOptions
    )

    sendResponse<IPayHistory[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Turf Data retrieved successfully !',
      meta: result.meta,
      data: result.data,
    })
  }
)

const getPayHistory = catchAsync(async (req: Request, res: Response) => {
  const dates = String(req.query.date)
  const result = await PayHistoryService.getData(dates)

  sendResponse<IPayHistory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Turf Data retrieved successfully !',
    data: result,
  })
})

const getSinglePayHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await PayHistoryService.getSinglePayHistoryService(id)

    sendResponse<IPayHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Turf Data retrieved successfully !',
      data: result,
    })
  }
)

const updatePayHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData = req.body

    const result = await PayHistoryService.updatePayHistory(id, updateData)

    sendResponse<IPayHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Turf Data updated successfully !',
      data: result,
    })
  }
)
const deleteSinglePayHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await PayHistoryService.deletePayHistory(id)

    sendResponse<IPayHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Semesters deleted successfully !',
      data: result,
    })
  }
)
const getSingleUserPayHistoryDataController = catchAsync(
    async (req: Request, res: Response) => {
      const email = req.params.email
      const result =
        await PayHistoryService.singleUserPayHistoryDataService(email)
  
      sendResponse<IPayHistory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single User Turf Booking Data retrieved successfully !',
        data: result,
      })
    }
  )

export const PayHistoryController = {
  createPayHistoryController,
  getAllPayHistoryController,
  getSinglePayHistoryController,
  updatePayHistoryController,
  deleteSinglePayHistoryController,
  getPayHistory,
  getSingleUserPayHistoryDataController
}
