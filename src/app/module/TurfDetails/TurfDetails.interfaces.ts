import { Model } from 'mongoose'

export type ITurfData = {
  turf_name: string
  email:string
  ownerId:string
  ownerPhone:string
  address: string
  city:string
  price: string
  person?: string[]
  slots?: string[]
  logo: string
  cover: string
  about: string
  rules: string
  
  
  
}
export type ITurfDataFilters = {
  searchTerm?: string
}

export type TurfDataModel = Model<ITurfData, object>
