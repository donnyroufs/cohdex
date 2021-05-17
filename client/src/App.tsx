import { useEffect } from 'react'
import { Spinner } from './components/generic/Spinner'
import { Router } from './router'
import { fetchMe } from './store/slices/authSlice'
import { useAppDispatch, useAppSelector } from './store/store'

function App() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.auth.isLoading)

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch])

  if (loading) {
    return <Spinner withMessage />
  }

  return <Router />
}

export default App
