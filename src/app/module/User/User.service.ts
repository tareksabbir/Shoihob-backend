import { IUserData } from './User.interface'
import { UserData } from './User.model'

const createUserDataService = async (
  payload: IUserData
): Promise<{ success: boolean; message?: string; data?: IUserData }> => {
  const query = { email: payload.email }
  const existingUser = await UserData.findOne(query)
  if (existingUser) {
    const message = 'User Already Exist'
    return { success: false, message }
  }

  const result = await UserData.create(payload)
  return { success: true, data: result }
}

export const UserDataService = {
  createUserDataService,
}
