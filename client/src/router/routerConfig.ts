import { IRoute } from '../types'
import { CreateStrategy, Home, NotFound, Strategies, Strategy } from '../pages'
import { BaseLayout } from '../components/layouts'

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
    layout: BaseLayout,
  },
  {
    path: '/strategies/create',
    component: CreateStrategy,
    withAuth: true,
    exact: false,
    layout: BaseLayout,
  },
  {
    path: '/strategy/:slug',
    component: Strategy,
    withAuth: true,
    exact: false,
    layout: BaseLayout,
  },
  {
    path: '*',
    component: NotFound,
    withAuth: false,
    exact: false,
    layout: BaseLayout,
  },
]

export const routePathsWithLayout = routerConfig
  .filter((route) => route.layout)
  .map((route) => route.path)

export const routePaths = routerConfig.map((route) => route.path)
