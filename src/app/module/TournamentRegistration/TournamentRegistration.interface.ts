import { Model, Types } from 'mongoose'
import { ITournamentData } from '../TournamentDetails/Tournament.interface'

export type ITournamentRegistrationData = {
  address: string
  captain_name: string
  city: string
  email: string
  person: number
  player_2_email: string
  player_3_email: string
  player_4_email: string
  player_5_email: string
  player_6_email: string
  player_7_email: string
  player_Phone_one: string
  price: number
  team_name: string
  transactionId: string
  paid: boolean
  tournamentId?: Types.ObjectId | ITournamentData
}

export type ITournamentRegistrationDataFilters = {
  searchTerm?: string
}

export type TournamentRegistrationDataModel = Model<
  ITournamentRegistrationData,
  Record<string, unknown>
>
