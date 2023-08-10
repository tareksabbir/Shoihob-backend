import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  ITournamentRegistrationData,
  ITournamentRegistrationDataFilters,
} from './TournamentRegistration.interface'
import { TournamentRegistration } from './TournamentRegistration.model'
import { TournamentRegistrationDataSearchableFields } from './TournamentRegistration.constant'


// const createTournamentRegistrationDataService = async (
//   payload: ITournamentRegistrationData
// ): Promise<ITournamentRegistrationData> => {
//   const result = await TournamentRegistration.create(payload)
//   return result
// }

const getAllTournamentRegistrationDataService = async (
  filters: ITournamentRegistrationDataFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITournamentRegistrationData[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: TournamentRegistrationDataSearchableFields.map(field => ({
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

  const result = await TournamentRegistration.find(whereConditions)
    .populate('tournamentId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await TournamentRegistration.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleTournamentRegistrationDataService = async (
  id: string
): Promise<ITournamentRegistrationData | null> => {
  const result = await TournamentRegistration.findById(id)
  return result
}

const deleteTournamentRegistrationData = async (
  id: string
): Promise<ITournamentRegistrationData | null> => {
  const result = await TournamentRegistration.findByIdAndDelete(id)
  return result
}

const singleUserTournamentRegistrationDataService = async (
  email: string
): Promise<ITournamentRegistrationData[]> => {
  const result = await TournamentRegistration.find({ email })
  return result
}

const getPaymentDetailsService = async (
  transactionId: string
): Promise<ITournamentRegistrationData[] | null> => {
  const result = await TournamentRegistration.find({ transactionId })
  return result
}

export const TournamentRegistrationDataService = {
  //createTournamentRegistrationDataService,
  getAllTournamentRegistrationDataService,
  getSingleTournamentRegistrationDataService,
  
  deleteTournamentRegistrationData,
  singleUserTournamentRegistrationDataService,
  getPaymentDetailsService,
}
