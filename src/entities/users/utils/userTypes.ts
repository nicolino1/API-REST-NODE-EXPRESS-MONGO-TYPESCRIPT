export interface IUser {
  name: string,
  email: string,
  password: string,
}

export type SessionInfo = Omit<IUser, 'name'>