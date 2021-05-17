import { Box } from '@chakra-ui/react'
import { Header } from './components'

export const BaseLayout: React.FC = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  )
}
