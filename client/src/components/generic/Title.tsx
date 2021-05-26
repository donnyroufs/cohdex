import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

interface ITitleProps {
  value: string
}

export const Title: React.FC<ITitleProps> = ({ value }) => {
  return (
    <Box display="flex" alignItems="center" mt={12}>
      <Box
        backgroundColor="primary.600"
        h={6}
        w={6}
        transform="rotate(45deg)"
        marginRight={5}
      />
      <Heading
        fontSize="2xl"
        textColor="text.600"
        textTransform="uppercase"
        fontWeight="bold"
      >
        {value}
      </Heading>
    </Box>
  )
}
