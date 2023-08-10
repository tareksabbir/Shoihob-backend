import { Schema, model } from 'mongoose'
import { ITournamentData, TournamentDataModel } from './Tournament.interface'

const TournamentSchema = new Schema<ITournamentData>(
  {
    tournament_name: { type: String, required: true },
    turf_name: { type: String, required: true },
    email: { type: String, required: true },
    turf_id: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    person: { type: Number, default: 7 },
    logo: { type: String, required: true },
    cover: { type: String, required: true },
    about: { type: String, required: true },
    rules: { type: String, required: true },
    registration_start: { type: String, required: true },
    registration_end: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const TournamentDetails = model<ITournamentData, TournamentDataModel>(
  'TournamentDetails',
  TournamentSchema
)
