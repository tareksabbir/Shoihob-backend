/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { TournamentRegistrationDataService } from './TournamentRegistration.service'
import { ITournamentRegistrationData } from './TournamentRegistration.interface'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { pick } from '../../../shared/pick'
import { TournamentRegistrationDataFilterableFields } from './TournamentRegistration.constant'
import { paginationFields } from '../../../constance/pagination'

import { v4 as uuidv4 } from 'uuid'
import { TournamentDetails } from '../TournamentDetails/Tournament.model'
import { TournamentRegistration } from './TournamentRegistration.model'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SSLCommerzPayment = require('sslcommerz-lts')

const store_id = process.env.Store_ID
const store_passwd = process.env.Store_Password
const is_live = false

// const createTournamentDataController = catchAsync(
//     async (req: Request, res: Response) => {
//       const { ...registrationData } = req.body
//       const result = await TournamentRegistrationDataService.createTournamentRegistrationDataService(
//         registrationData
//       )

//       sendResponse<ITournamentRegistrationData>(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Registration Details Posted Successfully!',
//         data: result,
//       })
//     }
//   )

const getAllTournamentRegistrationDataController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, TournamentRegistrationDataFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result =
      await TournamentRegistrationDataService.getAllTournamentRegistrationDataService(
        filters,
        paginationOptions
      )

    sendResponse<ITournamentRegistrationData[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Registration Data retrieved successfully !',
      meta: result.meta,
      data: result.data,
    })
  }
)
const getSingleTournamentRegistrationDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result =
      await TournamentRegistrationDataService.getSingleTournamentRegistrationDataService(
        id
      )

    sendResponse<ITournamentRegistrationData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Registration Data retrieved successfully !',
      data: result,
    })
  }
)
const postTournamentRegistrationDataController = catchAsync(
  async (req: Request, res: Response) => {
    const updateData = req.body
    const id = updateData.tournamentId

    const bookingPayment = await TournamentDetails.findById(id)

    const transactionId = uuidv4()

    const data = {
      total_amount: bookingPayment?.price,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `http://localhost:5000/api/v1/tournamentRegistration/success?transactionId=${transactionId}`,
      fail_url: 'http://localhost:5000/api/v1//tournamentRegistration/fail',
      cancel_url: 'http://localhost:5000/api/v1//tournamentRegistration/cancel',
      ipn_url: 'http://localhost:5000/api/v1//tournamentRegistration/ipn',
      shipping_method: 'Booking Payment Confirmation',
      product_name: 'Shoishob Zone Slot Booking.',
      product_category: 'Booking',
      product_profile: 'general',
      cus_name: updateData?.captain_name,
      cus_email: updateData?.email,
      cus_add1: updateData?.address,
      cus_add2: 'Dhaka',
      cus_city: updateData?.city,
      cus_state: updateData?.city,
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01811113264',
      cus_fax: updateData?.phone,
      ship_name: updateData?.captain_name,
      ship_add1: updateData?.address,
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    }


    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then((apiResponse: { GatewayPageURL: any }) => {
      const GatewayPageURL = apiResponse.GatewayPageURL
      TournamentRegistration.create({
        ...updateData,
        price:bookingPayment?.price,
        transactionId: transactionId,
        paid: false,
        
      })
      res.send({ url: GatewayPageURL })

     
    })
  }
)

const paymentConfirmation = async (req: Request, res: Response) => {
  const { transactionId } = req.query
  
  const result = await TournamentRegistration.findOneAndUpdate(
    { transactionId },
    { paid: true, paidAt: new Date() }
  )

  if (result?.isModified) {
    res.redirect(
      `http://localhost:5173/dashboard/tournament/payment/success?transactionId=${transactionId}`
    )
  } else {
    res.status(404).send('Document not found or no changes made.')
  }
}

const deleteSingleTournamentRegistrationDataController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result =
      await TournamentRegistrationDataService.deleteTournamentRegistrationData(
        id
      )

    sendResponse<ITournamentRegistrationData>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Registration deleted successfully !',
      data: result,
    })
  }
)

const getSingleUserTournamentRegistrationDataController = catchAsync(
  async (req: Request, res: Response) => {
    const email = req.params.email
    const result =
      await TournamentRegistrationDataService.singleUserTournamentRegistrationDataService(
        email
      )

    sendResponse<ITournamentRegistrationData[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User Registration Data retrieved successfully !',
      data: result,
    })
  }
)

const getPaymentDetailsController = catchAsync(
  async (req: Request, res: Response) => {
    const transactionId = req.params.transactionId
    const result =
      await TournamentRegistrationDataService.getPaymentDetailsService(
        transactionId
      )

    sendResponse<ITournamentRegistrationData[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User Registration Data retrieved successfully !',
      data: result,
    })
  }
)

export const TournamentRegistrationDataController = {
  getAllTournamentRegistrationDataController,
  getSingleTournamentRegistrationDataController,
  postTournamentRegistrationDataController,
  deleteSingleTournamentRegistrationDataController,
  getSingleUserTournamentRegistrationDataController,
  paymentConfirmation,
  getPaymentDetailsController,
  //createTournamentDataController
}
