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
          to="/strategies"
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
          {user && <Dropdown />}
          {!user && (
            <Link
              display="flex"
              href="http://localhost:5000/api/v1/auth/login"
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
