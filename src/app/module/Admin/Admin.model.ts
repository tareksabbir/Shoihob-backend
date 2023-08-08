import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin } from './Admin.interface'

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    dateOfBirth: { type: String },
    photo: { type: String },
    cover: { type: String },
    emergencyContactNo: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    designation: { type: String },
    role: { type: String },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    about: { type: String },
    facebook: { type: String },
    insta: { type: String },

  
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema)
