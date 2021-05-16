import { useEffect } from 'react'
import { Spinner } from './components/generic/Spinner'
import { Home } from './pages'
import { fetchMe } from './store/slices/authSlice'
import { useAppDispatch, useAppSelector } from './store/store'

function App() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.auth.isLoading)

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch])

  if (loading) {
    return <Spinner withMessage={true} />
  }

  return (
    <>
      <Home />
    </>
  )
}

export default App
