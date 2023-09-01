import { paginationHelper } from '../../../helpers/paginationHelper'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'

import { SortOrder } from 'mongoose'
import { IPayHistory, IPayHistoryFilters } from './PayHistory.interface'
import { PayHistory } from './PayHistory.model'
import { PayHistorySearchableFields } from './PayHistory.constant'

const createPayHistoryService = async (
  payload: IPayHistory
): Promise<IPayHistory> => {
  const result = await PayHistory.create(payload)
  return result
}

const getData = async (date: string): Promise<IPayHistory[] | null> => {
  const result = await PayHistory.aggregate([
    {
      $lookup: {
        from: 'turfbookingdatas',
        localField: 'turf_name',
        foreignField: 'turf',
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$selectedDate', date],
              },
            },
          },
        ],
        as: 'booked',
      },
    },
    {
      $project: {
        turf_name: 1,
        slots: 1,
        logo: 1,
        price: 1,
        ownerId: 1,
        booked: {
          $map: {
            input: '$booked',
            as: 'book',
            in: '$$book.slot',
          },
        },
      },
    },
    {
      $project: {
        turf_name: 1,
        logo: 1,
        slots: {
          $setDifference: ['$slots', '$booked'],
        },
        price: 1,
        ownerId: 1,
      },
    },
  ])
  return result
}

const getAllPayHistoryService = async (
  filters: IPayHistoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPayHistory[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: PayHistorySearchableFields.map(field => ({
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

  const result = await PayHistory.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await PayHistory.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSinglePayHistoryService = async (
  id: string
): Promise<IPayHistory | null> => {
  const result = await PayHistory.findById(id)
  return result
}

const updatePayHistory = async (
  id: string,
  payload: Partial<IPayHistory>
): Promise<IPayHistory | null> => {
  const result = await PayHistory.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deletePayHistory = async (id: string): Promise<IPayHistory | null> => {
  const result = await PayHistory.findByIdAndDelete(id)
  return result
}
const singleUserPayHistoryDataService = async (
    email: string
  ): Promise<IPayHistory[]> => {
    const result = await PayHistory.find({ email })
    return result
  }

export const PayHistoryService = {
  createPayHistoryService,
  getAllPayHistoryService,
  getSinglePayHistoryService,
  updatePayHistory,
  deletePayHistory,
  getData,
  singleUserPayHistoryDataService
}
