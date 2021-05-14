import { Box, Heading, Text } from '@chakra-ui/layout'

export const Welcome = () => (
  <Box
    pos="absolute"
    top="16"
    left="-10"
    zIndex="3"
    borderLeft="4px"
    borderColor="primary.600"
    paddingLeft={6}
    paddingY={4}
  >
    <Heading
      color="primary.400"
      textTransform="uppercase"
      mb={2}
      fontSize="xxx-large"
      letterSpacing="wider"
    >
      Strategist
    </Heading>
    <Text fontSize="x-large" color="vintage.100" maxW="36ch">
      Create COH strategies online with ease. Learn strategies of others, share
      yours and be better than yesterday!
    </Text>
  </Box>
)
