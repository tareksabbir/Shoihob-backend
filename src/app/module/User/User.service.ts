import { IUserData } from './User.interface'
import { UserData } from './User.model'

const createUserDataService = async (
  payload: IUserData
): Promise<IUserData> => {
  const result = await UserData.create(payload)
  return result
}

export const UserDataService = {
  createUserDataService,
}
