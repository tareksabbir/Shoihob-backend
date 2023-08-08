import { Model } from 'mongoose'

export type ITournamentData = {
  tournament_name: string 
  turf_name: string 
  email:string     
  turf_id:string
  ownerPhone:string 
  address: string
  price: number 
  person?: number 
  logo: string 
  cover: string 
  about: string 
  rules: string 
  registration_start:string
  registration_end:string
  city:string
  
}
export type ITournamentDataFilters = {
  searchTerm?: string
}

export type TournamentDataModel = Model<ITournamentData, object>





//               registration_start:data.registration_start,
//               registration_end:data.registration_end,




//               
//               