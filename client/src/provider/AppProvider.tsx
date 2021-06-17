import React from 'react'
import { AppContext } from './AppContext'
import * as container from './Container'

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        ...container,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
