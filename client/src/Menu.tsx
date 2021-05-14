import { Box, Link } from '@chakra-ui/layout'

export const Menu = () => (
  <Box
    pos="absolute"
    bottom="24"
    right="5"
    zIndex="3"
    paddingY={4}
    display="flex"
    flexDir="column"
  >
    <Box w={60}>
      <Link
        textDecoration="none"
        href="/"
        textTransform="uppercase"
        backgroundColor="primary.600"
        color="vintage.100"
        fontWeight="bold"
        fontSize="xl"
        mb={4}
        h={20}
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{
          textDecor: 'none',
          transform: 'scale(1.05)',
        }}
      >
        register
      </Link>
      <Link
        textDecoration="none"
        href="/"
        textTransform="uppercase"
        backgroundColor="transparent"
        border="2px"
        borderColor="primary.600"
        fontWeight="bold"
        color="vintage.100"
        fontSize="xl"
        h={20}
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{
          textDecor: 'none',
          transform: 'scale(1.05)',
        }}
      >
        join discord
      </Link>
    </Box>
  </Box>
)
