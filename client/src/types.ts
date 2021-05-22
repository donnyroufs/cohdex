import { FunctionComponent, ReactNode } from 'react'
import { IUser } from '@cohdex/shared'
import { RouteComponentProps } from 'react-router-dom'

export interface IAuthState {
  isLoading: boolean
  user: IUser | null
}

export interface IRoute {
  path: string
  component: FunctionComponent
  withAuth: boolean
  exact: boolean
  layout?: FunctionComponent
}

export type CompoundComponent<T, U = Object> = React.FC<U> & T

export type WithChildren<Props = Record<string, unknown>> = Props & {
  children: ReactNode
}

export interface IAuthRouteProps {
  component: React.FC<RouteComponentProps>
  withAuth: boolean
}
