import { Model, Types } from 'mongoose'
import { IAdmin } from '../Admin/Admin.interface'

export type ITurfData = {
  turf_name: string
  email: string
  ownerPhone: string
  address: string
  city: string
  price: string
  person?: string[]
  slots?: string[]
  logo: string
  cover: string
  about: string
  rules: string
  ownerId?: Types.ObjectId | IAdmin
}
export type ITurfDataFilters = {
  searchTerm?: string
}

export type TurfDataModel = Model<ITurfData, Record<string, unknown>>
