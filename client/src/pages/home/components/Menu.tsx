import { Link as ReactLink } from 'react-router-dom'
import { Box, Link, keyframes } from '@chakra-ui/react'
import { useAppSelector } from '../../../store/store'

const slide = keyframes`
  from { transform: translateX(30%); opacity: 0; }
  to { transform: translateX(0%); opacity: 1; }
`

export const Menu = () => {
  const user = useAppSelector((state) => state.auth.user)

  const animation = `${slide} forwards 0.25s linear 0.75s`
  const animation1 = `${slide} forwards 0.25s linear 0.85s`

  return (
    <Box
      pos={{ base: 'static', md: 'absolute' }}
      bottom="24"
      right="5"
      zIndex="3"
      paddingY={4}
      display="flex"
      flexDir="column"
    >
      <Box w={60}>
        <Box animation={animation} opacity={0} transform="translate(30%)">
          {user && (
            <Link
              as={ReactLink}
              to="/strategies"
              textDecoration="none"
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
              fontFamily="play"
              letterSpacing="wider"
              alignItems="center"
              _hover={{
                textDecor: 'none',
                transform: 'scale(1.05)',
              }}
            >
              get started
            </Link>
          )}

          {!user && (
            <Link
              textDecoration="none"
              href={process.env.REACT_APP_BASE_URL + '/api/v1/auth/login'}
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
              fontFamily="play"
              letterSpacing="wider"
              alignItems="center"
              _hover={{
                textDecor: 'none',
                transform: 'scale(1.05)',
              }}
            >
              get started
            </Link>
          )}
        </Box>
        <Box opacity={0} transform="translate(30%)" animation={animation1}>
          <Link
            as={ReactLink}
            to="/strategies"
            fontFamily="play"
            textDecoration="none"
            textTransform="uppercase"
            backgroundColor="transparent"
            border="2px"
            borderColor="primary.600"
            letterSpacing="wider"
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
            go to website
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
