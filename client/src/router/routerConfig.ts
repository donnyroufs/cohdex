import { IRoute } from '../types'
import { Home, Strategies } from '../pages'

export const routerConfig: IRoute[] = [
  {
    path: '/',
    component: Home,
    withAuth: false,
    exact: true,
  },
  {
    path: '/strategies',
    component: Strategies,
    withAuth: false,
    exact: true,
  },
]
