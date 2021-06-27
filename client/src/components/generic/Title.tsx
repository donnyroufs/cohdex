import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

interface ITitleProps {
  value: string
  ml?: any
  mt?: number | string
  mb?: number | string
  className?: string
}

export const Title: React.FC<ITitleProps> = ({
  value,
  ml,
  mt,
  mb,
  className,
}) => {
  return (
    <Box
      className={className}
      display="flex"
      alignItems="center"
      mt={mt != null ? mt : 12}
      mb={mb != null ? mb : 0}
      ml={ml || 0}
    >
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
