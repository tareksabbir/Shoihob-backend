import { Schema, model } from 'mongoose'
import { ITurfBookingData, TurfBookingDataModel } from './TurfBooking.interface'

export const turfBookingSchema: Schema<ITurfBookingData> = new Schema(
  {
    address: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    selectedDate: { type: String, required: true },
    slot: { type: String, required: true },
    trxId: { type: String, required: true },
    turf: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const TurfBookingData = model<ITurfBookingData, TurfBookingDataModel>(
  'TurfBookingData',
  turfBookingSchema
)
