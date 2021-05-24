import { useEffect, useState } from 'react'
import { preloadImage } from '../utils'

export function useLoadImage(imgUrl: string) {
  const [isLoaded, setIsLoaded] = useState(false)

  preloadImage(imgUrl).then(() => {
    setIsLoaded(true)
  })

  return [isLoaded]
}
