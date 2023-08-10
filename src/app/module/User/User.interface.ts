import { Model } from 'mongoose'

export type IUserData = {
  name: string
  email: string
  age?: number
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
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
 
}

export type IUserDataFilters = {
  searchTerm?: string
}

export type UserDataModel = Model<IUserData, object>
