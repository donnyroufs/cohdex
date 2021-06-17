import { useContext } from 'react'
import { AppContext } from '../provider/AppContext'

export const useProviders = () => {
  const deps = useContext(AppContext)
  return deps
}
