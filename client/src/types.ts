import { FunctionComponent } from 'react'

export interface IGetMeResponseDto {
  data: {
    user: IUser
  }
}

export interface IUser {
  avatar: string
  profileUrl: string
  steamId: string
}

export interface IAuthState {
  isLoading: boolean
  user: IUser | null
}

export interface IRoute {
  path: string
  component: FunctionComponent
  withAuth: boolean
  exact: boolean
}
