import {
  Container,
  Box,
  keyframes,
  usePrefersReducedMotion,
} from '@chakra-ui/react'
import { Menu } from './Menu'
import { Welcome } from './Welcome'

const spin = keyframes`
  from { opacity: 0; }
  to { opacity: 0.45;}
  `

function App() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin}  forwards 1s linear`

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
          background="radial-gradient(40.26% 51.11% at 50% 50%, rgba(15, 18, 24, 0) 0%, #0a0c10 100%), url(landing-img.png)"
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

export default App
