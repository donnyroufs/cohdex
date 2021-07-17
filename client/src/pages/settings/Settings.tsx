import { Box, Flex, Heading } from '@chakra-ui/react'
import { BaseLayout } from '../../components/layouts'
import { Panel } from './components'

export const Settings = () => {
  return (
    <BaseLayout.Container>
      <Flex flexDir="column" maxW="800px" margin="auto">
        <Box as="header">
          <Heading color="primary.600">Settings</Heading>
        </Box>
        <Panel placeholderValue="your name" />
      </Flex>
    </BaseLayout.Container>
  )
}
