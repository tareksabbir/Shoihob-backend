// PayHistory.controller.ts - Fixed controller with proper error handling
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
    const payHistoryData = req.body
    const result = await PayHistoryService.createPayHistoryService(payHistoryData)

    sendResponse<IPayHistory>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Pay History created successfully!',
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
      message: 'Pay History retrieved successfully!',
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSinglePayHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await PayHistoryService.getSinglePayHistoryService(id)

    if (!result) {
      return sendResponse<IPayHistory>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Pay History not found!',
        data: null,
      })
    }

    sendResponse<IPayHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pay History retrieved successfully!',
      data: result,
    })
  }
)

const updatePayHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData = req.body

    const result = await PayHistoryService.updatePayHistory(id, updateData)

    if (!result) {
      return sendResponse<IPayHistory>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Pay History not found!',
        data: null,
      })
    }

    sendResponse<IPayHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pay History updated successfully!',
      data: result,
    })
  }
)

const deleteSinglePayHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await PayHistoryService.deletePayHistory(id)

    if (!result) {
      return sendResponse<IPayHistory>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Pay History not found!',
        data: null,
      })
    }

    sendResponse<IPayHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pay History deleted successfully!',
      data: result,
    })
  }
)

const getSingleUserPayHistoryDataController = catchAsync(
  async (req: Request, res: Response) => {
    const email = req.params.email
    const result = await PayHistoryService.singleUserPayHistoryDataService(email)

    sendResponse<IPayHistory[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Pay History retrieved successfully!',
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
  getSingleUserPayHistoryDataController
}