import { FunctionComponent } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAppSelector } from '../store/store'

export const AuthRoute: React.FC<{
  component: FunctionComponent
  withAuth: boolean
}> = ({ children, component: Component, withAuth, ...rest }) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...rest} />
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
