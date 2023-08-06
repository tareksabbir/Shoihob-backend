import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  ITurfBookingData,
  ITurfBookingDataFilters,
} from './TurfBooking.interface'
import { TurfBookingData } from './TurfBooking.model'
import { turfBookingDataSearchableFields } from './TurfBooking.constant'

const createTurfBookingDataService = async (
  payload: ITurfBookingData
): Promise<{ success: boolean; message?: string; data?: ITurfBookingData }> => {
  const query = {
    selectedDate: payload.selectedDate,
    email: payload.email,
  }
  const alreadyBooked = await TurfBookingData.find(query)
  if (alreadyBooked.length) {
    const message = `You already have a booking on ${payload.selectedDate}`
    return { success: false, message }
  }

  const result = await TurfBookingData.create(payload)
  return { success: true, data: result }
}

const getAllTurfBookingDataService = async (
  filters: ITurfBookingDataFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITurfBookingData[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: turfBookingDataSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await TurfBookingData.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await TurfBookingData.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleTurfBookingDataService = async (
  id: string
): Promise<ITurfBookingData | null> => {
  const result = await TurfBookingData.findById(id)
  return result
}

const deleteTurfBookingData = async (
  id: string
): Promise<ITurfBookingData | null> => {
  const result = await TurfBookingData.findByIdAndDelete(id)
  return result
}

const singleUserTurfBookingDataService = async (
  email: string
): Promise<ITurfBookingData[]> => {
  const result = await TurfBookingData.find({ email })
  return result
}

const getPaymentDetailsService = async (
  transactionId: string
): Promise<ITurfBookingData[] | null> => {
  const result = await TurfBookingData.find({transactionId})
  return result
}

export const TurfBookingDataService = {
  createTurfBookingDataService,
  getAllTurfBookingDataService,
  getSingleTurfBookingDataService,
  //updateTurfBookingData,
  deleteTurfBookingData,
  singleUserTurfBookingDataService,
  getPaymentDetailsService,
}
