import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Container as ChakraContainer } from '@chakra-ui/react'
import { CompoundComponent } from '../../../types'
import { Header } from './components'
import { routePaths, routePathsWithLayout } from '../../../router'

interface IBaseLayoutProps {
  Container: React.FC
  FullContainer: React.FC
}

export const BaseLayout: CompoundComponent<IBaseLayoutProps> = ({
  children,
}) => {
  const location = useLocation()

  const shouldRenderHeader =
    routePathsWithLayout.includes(location.pathname) ||
    routePaths.filter((path) => path !== location.pathname).length <= 0 ||
    !routePaths.includes(location.pathname)

  return (
    <Box>
      {shouldRenderHeader && <Header />}
      {children}
    </Box>
  )
}

BaseLayout.Container = ({ children }) => {
  return (
    <ChakraContainer maxW="1700px" mt={12} mb={14}>
      {children}
    </ChakraContainer>
  )
}

BaseLayout.FullContainer = ({ children }) => {
  return (
    <ChakraContainer
      maxW="1700px"
      h="calc(100vh - 128px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </ChakraContainer>
  )
}
