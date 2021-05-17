import { IRoute } from '../types'
import { Home, Test } from '../pages'

export const routerConfig: IRoute[] = [
  {
    path: '/',
    component: Home,
    withAuth: false,
    exact: true,
  },
  {
    path: '/test',
    component: Test,
    withAuth: true,
    exact: true,
  },
]
