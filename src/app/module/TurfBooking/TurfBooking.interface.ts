import { Model } from 'mongoose'

export type ITurfBookingData = {
  address?: string
  email: string
  name: string
  phone?: string
  selectedDate: string
  slot: string
  turf: string
  price: number
  photo: string
  ownerId: string
  city?: string
  person?: number
  transactionId: string
  paid: boolean
}

export type ITurfBookingDataFilters = {
  searchTerm?: string
}

export type TurfBookingDataModel = Model<ITurfBookingData, object>
