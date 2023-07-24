import { Schema, model } from 'mongoose'

import { ITurfData, TurfDataModel } from './TurfDetails.interfaces'

const turfDataSchema = new Schema<ITurfData>(
  {
    turf_name: { type: String, required: true },
    address: { type: String, required: true },
    about: { type: String, required: true },
    rules: { type: String, required: true },
    logo: { type: String, required: true },
    cover: { type: String, required: true },
    price: { type: String, required: true },
    person: { type: [Number], required: true },
    slots: { type: [String], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const TurfData = model<ITurfData, TurfDataModel>(
  'TurfData',
  turfDataSchema
)
