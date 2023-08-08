import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUserData } from './User.interface'
import { UserDataService } from './User.service'
import { Request, Response } from 'express'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constance/pagination'
import { userDataFilterableFields } from './User.constant'

const createUserDataController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body
    const result = await UserDataService.createUserDataService(userData)

    if (result.success === false) {
      return sendResponse<IUserData>(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: result.message,
        data: null,
      })
    }

    sendResponse<IUserData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully!',
      data: result.data,
    })
  }
)

const getAllUserController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userDataFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await UserDataService.getAllUserDataService(
    filters,
    paginationOptions
  )

  sendResponse<IUserData[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Booking Data retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleUserDataController = catchAsync(
  async (req: Request, res: Response) => {
    const email = req.params.email;
    const result = await UserDataService.getSingleUserDataService(email);

    sendResponse<IUserData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User Data retrieved successfully!',
      data: result,
    });
  }
)


const updateUserDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData = req.body

    const result = await UserDataService.updateUserData(id, updateData)

    sendResponse<IUserData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User Data updated successfully !',
      data: result,
    })
  }
)
const deleteSingleUserDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await UserDataService.deleteUserData(id)

    sendResponse<IUserData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Semesters deleted successfully !',
      data: result,
    })
  }
)

const isAdminController = async (req: Request, res: Response) => {
  try {
    // Assuming the user's email is sent as a query parameter in the request
    const userEmail = req.params.email

    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, message: 'User email not provided.' })
    }

    // Check if the email from req.decoded matches the provided email
    if (req.decoded.email as string !== userEmail) {
      return res.json({ isAdmin: false })
    }

    // Call the verifyAdmin function to check if the user is an admin or not
    const adminCheckResult = await UserDataService.verifyAdmin(userEmail)

    // Send the appropriate response based on the result
    if (adminCheckResult.success && adminCheckResult.isAdmin) {
      return res.json({ isAdmin: true })
    } else {
      return res.json({ isAdmin: false })
    }
  } catch (error) {
    console.error('Error in isAdminController:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error.' })
  }
}



export const UserDataController = {
  createUserDataController,
  getAllUserController,
  getSingleUserDataController,
  updateUserDataController,
  deleteSingleUserDataController,
  isAdminController,
  
}
