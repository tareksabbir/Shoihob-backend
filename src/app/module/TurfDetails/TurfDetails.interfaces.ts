import { Model } from 'mongoose'



export type ITurfData = {
  turf_name: string
  address: string
  about: string
  rules: string
  logo: string
  cover: string
  price: string
  person: number[];
  slots: string[];
}
export type ITurfDataFilters = {
    searchTerm?: string;
  };

export type TurfDataModel = Model<ITurfData, object>
