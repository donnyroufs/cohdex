import {
  Box,
  Heading,
  Text,
  keyframes,
  usePrefersReducedMotion,
} from '@chakra-ui/react'

const slide = keyframes`
  from { transform: translateX(-30%); opacity: 0; }
  to { transform: translateX(0%); opacity: 1; }
`
export const Welcome = () => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${slide} forwards 0.25s linear 0.75s`

  return (
    <Box
      animation={animation}
      pos={{ base: 'static', md: 'absolute' }}
      top="16"
      opacity="0"
      transform="translateX(-30%)"
      left="-10"
      zIndex="3"
      borderLeft="4px"
      borderColor="primary.600"
      paddingLeft={6}
      paddingY={5}
      mb={{ base: '2rem', md: '0' }}
    >
      <Heading
        color="vintage.600"
        textTransform="uppercase"
        mb={0}
        fontSize="sm"
        letterSpacing="wider"
      >
        beta
      </Heading>
      <Heading
        color="primary.400"
        textTransform="uppercase"
        mb={4}
        fontSize="xxx-large"
        letterSpacing="wider"
      >
        Cohdex
      </Heading>
      <Text fontSize="x-large" color="vintage.100" maxW="38ch">
        Create, improve and compare Company Of Heroes 2 strategies with an
        interactive tactical map in the browser for free!
      </Text>
    </Box>
  )
}
