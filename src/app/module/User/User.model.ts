import { Schema, model } from 'mongoose'
import { IUserData, UserDataModel } from './User.interface'

const userDataSchema = new Schema<IUserData>(
  {
    age: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    role: { type: String },
    photo: { type: String },
    cover: { type: String },
    about: { type: String },
    facebook: { type: String },
    insta: { type: String },
    point: { type: Number },
    payment: { type: Number },
   
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const UserData = model<IUserData, UserDataModel>(
  'UserData',
  userDataSchema
)
