import { Box } from '@chakra-ui/layout'
import { Command } from './components/Command'

export const Commands = () => {
  return (
    <Box mt={0} flex={1} minW="350px">
      <Command content="First Command" />
    </Box>
  )
}
