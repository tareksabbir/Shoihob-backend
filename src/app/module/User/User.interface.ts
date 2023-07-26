import { Model } from 'mongoose'

export type IUserData = {
  age?: number
  name: string
  email: string
  phone?: string
  address?: string
  role?: string
  point?: number
  payment?: number
  photo?: string
  cover?: string
  about?: string
  facebook?: string
  insta?: string
  blood?:string
}

export type IUserDataFilters = {
  searchTerm?: string
}

export type UserDataModel = Model<IUserData, object>
