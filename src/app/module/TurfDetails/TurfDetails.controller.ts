import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ITurfData } from './TurfDetails.interfaces'
import { TurfDataService } from './TurfDetails.service'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constance/pagination'
import { turfDataFilterableFields } from './TurfDetails.constant'

const createTurfDataController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body
    const result = await TurfDataService.createTurfDataService(
      academicSemesterData
    )

    sendResponse<ITurfData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Turf Details Posted Successfully!',
      data: result,
    })
  }
)

const getAllTurfDataController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, turfDataFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await TurfDataService.getAllTurfDataService(
      filters,
      paginationOptions
    )

    sendResponse<ITurfData[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Turf Data retrieved successfully !',
      meta: result.meta,
      data: result.data,
    })
  }
)

const getTurfData = catchAsync(async (req: Request, res: Response) => {
  const dates = String(req.query.date)
  const result = await TurfDataService.getData(dates)

  sendResponse<ITurfData[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Turf Data retrieved successfully !',
    data: result,
  })
})

const getSingleTurfDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await TurfDataService.getSingleTurfDataService(id)

    sendResponse<ITurfData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Turf Data retrieved successfully !',
      data: result,
    })
  }
)

const updateTurfDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData = req.body

    const result = await TurfDataService.updateTurfData(id, updateData)

    sendResponse<ITurfData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Turf Data updated successfully !',
      data: result,
    })
  }
)
const deleteSingleTurfDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await TurfDataService.deleteTurfData(id)

    sendResponse<ITurfData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Semesters deleted successfully !',
      data: result,
    })
  }
)

export const TurfDataController = {
  createTurfDataController,
  getAllTurfDataController,
  getSingleTurfDataController,
  updateTurfDataController,
  deleteSingleTurfDataController,
  getTurfData,
}
