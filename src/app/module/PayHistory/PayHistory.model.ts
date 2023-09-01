import { Schema, model } from 'mongoose'
import { IPayHistory, PayHistoryModel } from './PayHistory.interface'

const PayHistorySchema = new Schema<IPayHistory>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    transactionId: { type: String, required: true },
    slots: { type: String, required: true },
    date: { type: String, required: true },
    turf: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const PayHistory = model<IPayHistory, PayHistoryModel>(
  'PayHistory',
  PayHistorySchema
)
