import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  usePrefersReducedMotion,
  keyframes,
} from '@chakra-ui/react'
import { Menu, Welcome } from './components'
import { Spinner } from '../../components'

const spin = keyframes`
  from { opacity: 0; }
  to { opacity: 0.45;}
  `

export const Home = () => {
  const [loading, setLoading] = useState(true)

  const prefersReducedMotion = usePrefersReducedMotion()
  const animation = prefersReducedMotion
    ? undefined
    : `${spin}  forwards 1s linear`

  useEffect(() => {
    const img = new Image()
    img.src = 'images/landing-img.png'
    img.onload = () => setLoading(false)
  }, [])

  if (loading) {
    return <Spinner withMessage={true} />
  }

  return (
    <Container
      maxW="container.xl"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box pos="relative">
        <Box
          animation={animation}
          alt="coh2 wallpaper"
          background="radial-gradient(40.26% 51.11% at 50% 50%, rgba(15, 18, 24, 0) 0%, #0a0c10 100%), url(images/landing-img.png)"
          opacity="0.45"
          width={{ lg: '960px', xl: '1280px' }}
          height={{ lg: '500px', xl: '720px' }}
        ></Box>
        <Welcome />
        <Menu />
      </Box>
    </Container>
  )
}
