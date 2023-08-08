import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IAdmin, IAdminFilters } from './Admin.interface'
import { Admin } from './Admin.model'
import { AdminSearchableFields } from './Admin.constant'

const createAdminService = async (
  payload: IAdmin
): Promise<{ success: boolean; message?: string; data?: IAdmin }> => {
  const query = { email: payload.email }
  const existingUser = await Admin.findOne(query)
  if (existingUser) {
    const message = 'User Already Exist'
    return { success: false, message }
  }

  const result = await Admin.create(payload)
  return { success: true, data: result }
}

const getAllAdminService = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: AdminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Admin.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAdminService = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id)
  return result
}

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const result = await Admin.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id)
  return result
}

const verifySuperAdmin = async (
  payload: string
): Promise<{ success: boolean; isSuperAdmin?: boolean; message?: string }> => {
  const query = { email: payload };
  const user = await Admin.findOne(query);

  if (user && user.role === "superAdmin") {
    return { success: true, isSuperAdmin: true, message: "User is a SUPER admin." };
  } else {
    return { success: false, isSuperAdmin: false, message: "User is not a SUPER admin." };
  }
};

export const AdminService = {
  createAdminService,
  getAllAdminService,
  getSingleAdminService,
  updateAdmin,
  deleteAdmin,
  verifySuperAdmin
}
