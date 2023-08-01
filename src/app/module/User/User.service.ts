import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { userDataSearchableFields } from './User.constant'
import { IUserData, IUserDataFilters } from './User.interface'
import { UserData } from './User.model'

const createUserDataService = async (
  payload: IUserData
): Promise<{ success: boolean; message?: string; data?: IUserData }> => {
  const query = { email: payload.email }
  const existingUser = await UserData.findOne(query)
  if (existingUser) {
    const message = 'User Already Exist'
    return { success: false, message }
  }

  const result = await UserData.create(payload)
  return { success: true, data: result }
}

const getAllUserDataService = async (
  filters: IUserDataFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUserData[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: userDataSearchableFields.map(field => ({
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

  const result = await UserData.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await UserData.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUserDataService = async (
  email: string
): Promise<IUserData | null> => {
  const result = await UserData.findOne({ email });
  return result;
}

const updateUserData = async (
  id: string,
  payload: Partial<IUserData>
): Promise<IUserData | null> => {
  const result = await UserData.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteUserData = async (id: string): Promise<IUserData | null> => {
  const result = await UserData.findByIdAndDelete(id)
  return result
}


const verifyAdmin = async (
  payload: string
): Promise<{ success: boolean; isAdmin?: boolean; message?: string }> => {
  const query = { email: payload };
  const user = await UserData.findOne(query);

  if (user && user.role === "admin") {
    return { success: true, isAdmin: true, message: "User is an admin." };
  } else {
    return { success: false, isAdmin: false, message: "User is not an admin." };
  }
};



export const UserDataService = {
  createUserDataService,
  getAllUserDataService,
  getSingleUserDataService,
  updateUserData,
  deleteUserData,
  verifyAdmin
}
