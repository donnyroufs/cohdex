import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthRoute } from './AuthRoute'
import { routerConfig } from './routerConfig'

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routerConfig.map((route) => {
          if (route.withAuth) {
            return <AuthRoute {...route} key={route.path} />
          }

          return <Route {...route} key={route.path} />
        })}
      </Switch>
    </BrowserRouter>
  )
}
