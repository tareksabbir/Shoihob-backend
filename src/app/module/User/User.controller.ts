import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { IUserData } from "./User.interface"
import { UserDataService } from "./User.service"
import { Request, Response } from "express"

const createUserDataController = catchAsync(
    async (req: Request, res: Response) => {
      const { ...userData } = req.body
      const result = await UserDataService.createUserDataService(
        userData
      )
  
      sendResponse<IUserData>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Turf Details Posted Successfully!',
        data: result,
      })
    }
  )

  export const UserDataController = {
    createUserDataController
  }  