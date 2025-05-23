// PayHistory.service.ts - Fixed service methods with proper error handling
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { SortOrder } from 'mongoose'
import { IPayHistory, IPayHistoryFilters } from './PayHistory.interface'
import { PayHistory } from './PayHistory.model'
import { PayHistorySearchableFields } from './PayHistory.constant'

// Helper function to extract error message safely
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unknown error occurred'
}

const createPayHistoryService = async (
  payload: IPayHistory
): Promise<IPayHistory> => {
  try {
    const result = await PayHistory.create(payload)
    return result
  } catch (error) {
    throw new Error(`Failed to create pay history: ${getErrorMessage(error)}`)
  }
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

  try {
    const result = await PayHistory.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    // Fix: Count documents with the same conditions
    const total = await PayHistory.countDocuments(whereConditions)

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  } catch (error) {
    throw new Error(`Failed to get pay history: ${getErrorMessage(error)}`)
  }
}

const getSinglePayHistoryService = async (
  id: string
): Promise<IPayHistory | null> => {
  try {
    const result = await PayHistory.findById(id)
    return result
  } catch (error) {
    throw new Error(`Failed to get pay history: ${getErrorMessage(error)}`)
  }
}

const updatePayHistory = async (
  id: string,
  payload: Partial<IPayHistory>
): Promise<IPayHistory | null> => {
  try {
    const result = await PayHistory.findOneAndUpdate(
      { _id: id }, 
      payload, 
      {
        new: true,
        runValidators: true, // Ensure validation runs on update
      }
    )
    return result
  } catch (error) {
    throw new Error(`Failed to update pay history: ${getErrorMessage(error)}`)
  }
}

const deletePayHistory = async (id: string): Promise<IPayHistory | null> => {
  try {
    const result = await PayHistory.findByIdAndDelete(id)
    if (!result) {
      throw new Error('Pay history record not found')
    }
    return result
  } catch (error) {
    throw new Error(`Failed to delete pay history: ${getErrorMessage(error)}`)
  }
}

const singleUserPayHistoryDataService = async (
  email: string
): Promise<IPayHistory[]> => {
  try {
    const result = await PayHistory.find({ email }).sort({ createdAt: -1 })
    return result
  } catch (error) {
    throw new Error(`Failed to get user pay history: ${getErrorMessage(error)}`)
  }
}

export const PayHistoryService = {
  createPayHistoryService,
  getAllPayHistoryService,
  getSinglePayHistoryService,
  updatePayHistory,
  deletePayHistory,
  singleUserPayHistoryDataService
}