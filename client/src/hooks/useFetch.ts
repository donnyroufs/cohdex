import React from 'react'
import { BaseHttpResponse } from '../../../shared/dist'

export const useFetch = <T>(
  fetcher: () => Promise<BaseHttpResponse<T>>,
  initialState: T
) => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [data, setData] = React.useState<T>(initialState)

  React.useEffect(() => {
    if (data) return
    setLoading(true)

    fetcher()
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [fetcher, data])

  return {
    loading,
    data,
    error,
  }
}
