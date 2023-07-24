import { Model } from 'mongoose'

export type ITurfBookingData = {
  address: string
  email: string
  name: string
  phone: string
  selectedDate: string
  slot: string
  trxId: string
  turf: string
}

export type ITurfBookingDataFilters = {
  searchTerm?: string
}

export type TurfBookingDataModel = Model<ITurfBookingData, object>
