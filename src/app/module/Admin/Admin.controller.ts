import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { IAdmin } from './Admin.interface'
import { AdminService } from './Admin.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { pick } from '../../../shared/pick'
import { AdminFilterableFields } from './Admin.constant'
import { paginationFields } from '../../../constance/pagination'

const createAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...Adminpayload } = req.body
    const result = await AdminService.createAdminService(Adminpayload)

    if (result.success === false) {
      return sendResponse<IAdmin>(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: result.message,
        data: null,
      })
    }

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully!',
      data: result.data,
    })
  }
)

const getAllUserController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdminFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AdminService.getAllAdminService(
    filters,
    paginationOptions
  )

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Booking Data retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AdminService.getSingleAdminService(id)

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User Data retrieved successfully !',
      data: result,
    })
  }
)

const updateAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData = req.body

    const result = await AdminService.updateAdmin(id, updateData)

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User Data updated successfully !',
      data: result,
    })
  }
)
const deleteSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await AdminService.deleteAdmin(id)

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Semesters deleted successfully !',
      data: result,
    })
  }
)

const isSuperAdminController = async (req: Request, res: Response) => {
  try {
    const userEmail = req.params.email

    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, message: 'User email not provided.' })
    }

    if ((req.decoded.email as string) !== userEmail) {
      return res.json({ isSuperAdmin: false })
    }

    const adminCheckResult = await AdminService.verifySuperAdmin(userEmail)

    if (adminCheckResult.success && adminCheckResult.isSuperAdmin) {
      return res.json({ isSuperAdmin: true })
    } else {
      return res.json({ isSuperAdmin: false })
    }
  } catch (error) {
    console.error('Error in isSuperAdminController:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error.' })
  }
}

const getAdminByEmailController = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.params;

    const admin = await AdminService.getAdminByEmail(email);

    if (!admin) {
      return sendResponse<IAdmin>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Admin not found',
        data: null,
      });
    }

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin fetched successfully by email',
      data: admin,
    });
  }
);


export const AdminController = {
  createAdminController,
  getAllUserController,
  getSingleAdminController,
  updateAdminController,
  deleteSingleAdminController,
  isSuperAdminController,
  getAdminByEmailController
}
