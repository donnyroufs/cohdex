import { FunctionComponent } from 'react'
import { IUser } from '@cohdex/shared'

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
