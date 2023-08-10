import { Schema, model } from 'mongoose'
import {
  ITournamentRegistrationData,
  TournamentRegistrationDataModel,
} from './TournamentRegistration.interface'

export const TournamentRegistrationSchema: Schema<ITournamentRegistrationData> =
  new Schema(
    {
      address: { type: String, required: true },
      captain_name: { type: String, required: true },
      city: { type: String, required: true },
      email: { type: String, required: true },
      person: { type: Number, required: true },
      player_2_email: { type: String, required: true },
      player_3_email: { type: String, required: true },
      player_4_email: { type: String, required: true },
      player_5_email: { type: String, required: true },
      player_6_email: { type: String, required: true },
      player_7_email: { type: String, required: true },
      player_Phone_one: { type: String, required: true },
      price: { type: Number, required: true },
      team_name: { type: String, required: true },
      transactionId: { type: String, required: true },
      paid: { type: Boolean, required: true },
      tournamentId: {
        type: Schema.Types.ObjectId,
        ref: 'TournamentDetails',
        required: true,
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    }
  )

export const TournamentRegistration = model<
  ITournamentRegistrationData,
  TournamentRegistrationDataModel
>('TournamentRegistration', TournamentRegistrationSchema)
