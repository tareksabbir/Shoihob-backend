/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { TurfBookingDataService } from './TurfBooking.service'
import { ITurfBookingData } from './TurfBooking.interface'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { pick } from '../../../shared/pick'
import { turfBookingDataFilterableFields } from './TurfBooking.constant'
import { paginationFields } from '../../../constance/pagination'
import { TurfBookingData } from './TurfBooking.model'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SSLCommerzPayment = require('sslcommerz-lts')

const store_id = process.env.Store_ID
const store_passwd = process.env.Store_Password
const is_live = false

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

    const bookingPayment = await TurfBookingData.findById(id)

    const transactionId = uuidv4()

    const data = {
      total_amount: bookingPayment?.price,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `https://shoihob-backend.vercel.app/api/v1/bookings/success?transactionId=${transactionId}`,
      fail_url: 'https://shoihob-backend.vercel.app/api/v1/bookings/fail',
      cancel_url: 'https://shoihob-backend.vercel.app/api/v1/bookings/cancel',
      ipn_url: 'https://shoihob-backend.vercel.app/api/v1/bookings/ipn',
      shipping_method: 'Booking Payment Confirmation',
      product_name: 'Shoishob Zone Slot Booking.',
      product_category: 'Booking',
      product_profile: 'general',
      cus_name: bookingPayment?.name,
      cus_email: bookingPayment?.email,
      cus_add1: updateData?.address,
      cus_add2: 'Dhaka',
      cus_city: updateData?.city,
      cus_state: updateData?.city,
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: updateData?.phone,
      cus_fax: updateData?.phone,
      ship_name: bookingPayment?.name,
      ship_add1: updateData?.address,
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    }

    const updatedPayload = {
      ...updateData,
      paid: false,
      transactionId: transactionId,
    }

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then((apiResponse: { GatewayPageURL: any }) => {
      const GatewayPageURL = apiResponse.GatewayPageURL

      // Use await with findOneAndUpdate to wait for the update to complete
      TurfBookingData.findOneAndUpdate({ _id: id }, updatedPayload, {
        new: true,
      })
        .then(updatedBookingData => {
          // Now, the update has completed, and you can send the response
          res.send({ url: GatewayPageURL, updatedData: updatedBookingData })
        })
        .catch(error => {
          console.error('Error updating data:', error)
          res.status(500).send('Internal Server Error')
        })
    })
  }
)

const paymentConfirmation = async (req: Request, res: Response) => {
  const { transactionId } = req.query
  const result = await TurfBookingData.findOneAndUpdate(
    { transactionId },
    { paid: true, paidAt: new Date() }
  )

  if (result?.isModified) {
    res.redirect(
      `https://project-shoishob.vercel.app/dashboard/payment/success?transactionId=${transactionId}`
    )
  } else {
    res.status(404).send('Document not found or no changes made.')
  }
}

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

const getSingleUserTurfBookingDataController = catchAsync(
  async (req: Request, res: Response) => {
    const email = req.params.email
    const result =
      await TurfBookingDataService.singleUserTurfBookingDataService(email)

    sendResponse<ITurfBookingData[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User Turf Booking Data retrieved successfully !',
      data: result,
    })
  }
)

const getPaymentDetailsController = catchAsync(
  async (req: Request, res: Response) => {
    const transactionId = req.params.transactionId
    const result = await TurfBookingDataService.getPaymentDetailsService(
      transactionId
    )

    sendResponse<ITurfBookingData[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User Turf Booking Data retrieved successfully !',
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
  getSingleUserTurfBookingDataController,
  paymentConfirmation,
  getPaymentDetailsController,
}
