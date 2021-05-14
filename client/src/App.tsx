import { Container, Box } from '@chakra-ui/react'
import React from 'react'
import { Menu } from './Menu'
import { Welcome } from './Welcome'

function App() {
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
          alt="coh2 wallpaper"
          background="radial-gradient(40.26% 51.11% at 50% 50%, rgba(15, 18, 24, 0) 0%, #0a0c10 100%), url(landing-img.png)"
          opacity="0.45"
          width="1280px"
          height="720px"
        ></Box>
        <Welcome />
        <Menu />
      </Box>
    </Container>
  )
}

export default App
