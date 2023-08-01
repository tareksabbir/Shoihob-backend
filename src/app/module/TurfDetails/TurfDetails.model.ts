import { Schema, model } from 'mongoose'

import { ITurfData, TurfDataModel } from './TurfDetails.interfaces'

const turfDataSchema = new Schema<ITurfData>(
  {
    turf_name: { type: String, required: true },
    email: { type: String, required: true },
    ownerId: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: String, required: true },
    person: { type: [String],default:["12","14","16"]},
    slots: {
      type: [String],
      default: [
        '04.00 PM - 5.00 PM',
        '05.00 PM - 6.00 PM',
        '06.00 PM - 7.00 PM',
        '08.00 PM - 9.00 PM',
        '09.00 PM - 10.00 PM',
        '10.00 PM - 11.00 PM',
        '11.00 PM - 12.00 AM',
        '12.00 AM - 1.00 AM',
      ],
    },
    logo: { type: String, required: true },
    cover: { type: String, required: true },
    about: { type: String, required: true },
    rules: { type: String, required: true },
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
