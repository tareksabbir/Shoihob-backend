import { ITurfData, ITurfDataFilters } from './TurfDetails.interfaces'
import { TurfData } from './TurfDetails.model'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { turfDataSearchableFields } from './TurfDetails.constant'
import { SortOrder } from 'mongoose'

const createTurfDataService = async (
  payload: ITurfData
): Promise<ITurfData> => {
  const result = (await TurfData.create(payload)).populate('ownerId')
  return result
}

const getData = async (date: string): Promise<ITurfData[] | null> => {
  const result = await TurfData.aggregate([
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

const getAllTurfDataService = async (
  filters: ITurfDataFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITurfData[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: turfDataSearchableFields.map(field => ({
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

  const result = await TurfData.find(whereConditions)
    .populate('ownerId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await TurfData.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleTurfDataService = async (
  id: string
): Promise<ITurfData | null> => {
  const result = await TurfData.findById(id).populate('ownerId')
  return result
}

const updateTurfData = async (
  id: string,
  payload: Partial<ITurfData>
): Promise<ITurfData | null> => {
  const result = await TurfData.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('ownerId')
  return result
}

const deleteTurfData = async (id: string): Promise<ITurfData | null> => {
  const result = await TurfData.findByIdAndDelete(id)
  return result
}

const getTurfsByOwnerService = async (
  ownerId: string
): Promise<ITurfData[]> => {
  const result = await TurfData.find({
    ownerId: ownerId,
  }).populate('ownerId')
  return result
}

export const TurfDataService = {
  createTurfDataService,
  getAllTurfDataService,
  getSingleTurfDataService,
  updateTurfData,
  deleteTurfData,
  getData,
  getTurfsByOwnerService,
}
