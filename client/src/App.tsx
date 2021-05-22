import { FunctionComponent, useEffect } from 'react'
import { Spinner } from './components/generic/Spinner'
import { fetchMe } from './store/slices/authSlice'
import { useAppDispatch, useAppSelector } from './store/store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthRoute, routerConfig } from './router'
import { BaseLayout } from './components/layouts'
import { IAuthRouteProps } from './types'

function App() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.auth.isLoading)

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch])

  if (loading) {
    return <Spinner withMessage />
  }

  return (
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          {routerConfig.map((route) => {
            if (route.withAuth) {
              return <AuthRoute {...route} key={route.path} />
            }

            return <Route {...route} key={route.path} />
          })}
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  )
}

export default App
