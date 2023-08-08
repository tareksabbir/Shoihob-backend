import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { TournamentDataSearchableFields } from './Tournament.constant'
import { ITournamentData, ITournamentDataFilters } from './Tournament.interface'
import { TournamentDetails } from './Tournament.model'

const createTournamentDataService = async (
  payload: ITournamentData
): Promise<ITournamentData> => {
  const result = await TournamentDetails.create(payload)
  return result
}

const getAllTournamentDataService = async (
  filters: ITournamentDataFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITournamentData[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: TournamentDataSearchableFields.map(field => ({
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

  const result = await TournamentDetails.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await TournamentDetails.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleTournamentDataService = async (
  id: string
): Promise<ITournamentData | null> => {
  const result = await TournamentDetails.findById(id)
  return result
}

const updateTournamentData = async (
  id: string,
  payload: Partial<ITournamentData>
): Promise<ITournamentData | null> => {
  const result = await TournamentDetails.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )
  return result
}

const deleteTournamentData = async (
  id: string
): Promise<ITournamentData | null> => {
  const result = await TournamentDetails.findByIdAndDelete(id)
  return result
}

export const TournamentDataService = {
  createTournamentDataService,
  getAllTournamentDataService,
  getSingleTournamentDataService,
  updateTournamentData,
  deleteTournamentData
}
