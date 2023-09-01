import { Model } from 'mongoose'

export type IPayHistory = {
  name: string
  email: string
  phone?: string
  transactionId: string
  slots:string
  date:string
  turf:string
  price:number
  
}

export type IPayHistoryFilters = {
  searchTerm?: string
}

export type PayHistoryModel = Model<IPayHistory, object>