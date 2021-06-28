import React, { useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { useAppSelector } from '../store/store'
import { IAuthRouteProps } from '../types'

export const AuthRoute: React.FC<IAuthRouteProps> = ({
  children,
  component: Component,
  withAuth,
  ...rest
}) => {
  const history = useHistory()
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.isLoading && !auth.user) {
      history.push('/strategies')
    }
  }, [auth, history])

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth && !auth.isLoading) {
          return <Component {...props} />
        }

        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}
