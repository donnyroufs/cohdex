import { Link as ReactLink } from 'react-router-dom'
import { Box, Container, Flex, Heading, Link } from '@chakra-ui/layout'
import { useAppSelector } from '../../../../../store/store'
import { Dropdown } from './Dropdown'
import { FaSteam } from 'react-icons/fa'

export const Header = () => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <Flex
      as="header"
      backgroundColor="header"
      h={32}
      color="text.300"
      borderBottom="1px solid"
      borderColor="border"
    >
      <Container
        maxW="1700px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading
          as={ReactLink}
          to="/"
          textTransform="uppercase"
          color="primary.600"
          letterSpacing="wider"
        >
          <Box as="span" color="text.300">
            coh
          </Box>
          dex
        </Heading>
        <Box>
          {user && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Link
                display={{ base: 'none', sm: 'flex' }}
                as={ReactLink}
                to="/strategies/create"
                px={6}
                py={4}
                mr={6}
                background="primary.600"
                color="text.100"
                fontFamily="play"
                fontWeight="bold"
                _hover={{
                  textDecor: 'none',
                  background: 'primary.500',
                }}
              >
                Create Strategy
              </Link>
              <Dropdown />
            </Box>
          )}
          {!user && (
            <Link
              display="flex"
              href={process.env.REACT_APP_BASE_URL + '/auth/login'}
              background="background.800"
              py={6}
              px={10}
              fontFamily="play"
              fontWeight="bold"
              textTransform="capitalize"
              _hover={{
                background: 'background.700',
              }}
            >
              <FaSteam
                style={{
                  marginTop: '.1rem',
                  marginRight: '.6rem',
                  fontSize: '1.2rem',
                }}
              />
              login with steam
            </Link>
          )}
        </Box>
      </Container>
    </Flex>
  )
}
