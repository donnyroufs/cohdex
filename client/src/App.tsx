import { useEffect } from 'react'
import { Spinner } from './components/generic/Spinner'
import { fetchMe } from './store/slices/authSlice'
import { useAppDispatch, useAppSelector } from './store/store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthRoute, routerConfig } from './router'
import { BaseLayout } from './components/layouts'
import { ConfirmDisplay } from './components/app'

function App() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch])

  if (auth.isLoading) {
    return <Spinner withMessage />
  }

  return (
    <BrowserRouter>
      <BaseLayout>
        {auth.user && !auth.user.hasConfirmedDisplayName && <ConfirmDisplay />}
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
