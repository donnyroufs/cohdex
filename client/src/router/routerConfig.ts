import { IRoute } from '../types'
import { Home, NotFound, Strategies } from '../pages'

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
  {
    path: '*',
    component: NotFound,
    withAuth: false,
    exact: false,
  },
]
