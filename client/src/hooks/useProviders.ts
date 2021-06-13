import { useContext } from 'react'
import { AppContext } from '../AppContext'

export const useProviders = () => {
  const deps = useContext(AppContext)
  return deps
}
