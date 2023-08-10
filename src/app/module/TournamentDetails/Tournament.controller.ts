import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ITournamentData } from "./Tournament.interface"
import { TournamentDataService } from "./Tournament.service"
import { Request, Response } from "express"
import { pick } from "../../../shared/pick"
import { TournamentDataFilterableFields } from "./Tournament.constant"
import { paginationFields } from "../../../constance/pagination"

const createTournamentDataController = catchAsync(
    async (req: Request, res: Response) => {
      const { ...tournamentData } = req.body
      const result = await TournamentDataService.createTournamentDataService(
        tournamentData
      )
  
      sendResponse<ITournamentData>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tournament Details Posted Successfully!',
        data: result,
      })
    }
  )
  const getAllTournamentDataController = catchAsync(
    async (req: Request, res: Response) => {
      const filters = pick(req.query, TournamentDataFilterableFields)
      const paginationOptions = pick(req.query, paginationFields)
  
      const result = await TournamentDataService.getAllTournamentDataService(
        filters,
        paginationOptions
      )
  
      sendResponse<ITournamentData[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tournament Data retrieved successfully !',
        meta: result.meta,
        data: result.data,
      })
    }
  )

  const getSingleTournamentDataController = catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id
      const result = await TournamentDataService.getSingleTournamentDataService(id)
  
      sendResponse<ITournamentData>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Tournament Data retrieved successfully !',
        data: result,
      })
    }
  )
  
  const updateTournamentDataController = catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id
      const updateData = req.body
  
      const result = await TournamentDataService.updateTournamentData(id, updateData)
  
      sendResponse<ITournamentData>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Tournament Data updated successfully !',
        data: result,
      })
    }
  )
  const deleteSingleTournamentDataController = catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id
  
      const result = await TournamentDataService.deleteTournamentData(id)
  
      sendResponse<ITournamentData>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Semesters deleted successfully !',
        data: result,
      })
    }
  )


  export const TournamentDataController = {
    createTournamentDataController,
    getAllTournamentDataController,
    getSingleTournamentDataController,
    updateTournamentDataController,
    deleteSingleTournamentDataController
   
  }