import { Box, Button, Link } from '@chakra-ui/react'
import React from 'react'

export interface IFooterProps {
  handleFinalStep: () => void
}

export const Footer: React.FC<IFooterProps> = ({ handleFinalStep }) => {
  return (
    <Box as="footer" textAlign="center" pb={12}>
      <Button
        colorScheme="primary"
        background="primary.600"
        w="full"
        mt={12}
        onClick={handleFinalStep}
        fontFamily="play"
        _hover={{
          background: 'primary.500',
        }}
        _focus={{
          borderColor: 'none',
          background: 'primary.500',
        }}
      >
        Create
      </Button>
      <Link
        href={process.env.REACT_APP_DISCORD_URL}
        color="text.600"
        display="block"
        my={4}
        target="_blank"
        _focus={{
          border: '1px solid',
          borderColor: 'primary.500',
        }}
      >
        Map not here? Suggest it on
        <Box as="span" fontWeight="bold" color="primary.600" ml={1}>
          Discord
        </Box>
      </Link>
    </Box>
  )
}
