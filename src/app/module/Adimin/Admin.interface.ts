import { Model, Types } from 'mongoose'
import { ITurfData } from '../TurfDetails/TurfDetails.interfaces'

export type IAdmin = {
  id: string
  name: string
  email: string
  phone: string
  photo?: string
  cover?: string
  dateOfBirth?: string
  emergencyContactNo: string
  permanentAddress?: string
  presentAddress?: string
  designation: string
  role: string
  gender?: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  about?: string
  facebook?: string
  insta?: string
  turfDetails?: Types.ObjectId | ITurfData
 
}

export type IAdminFilters = {
  searchTerm?: string
  turfData?: Types.ObjectId
}

export type AdminModel = Model<IAdmin, object>
