import { Box } from '@chakra-ui/react'
export interface ILabelProps {
  value: string
  mb?: string | number
}

export const Label: React.FC<ILabelProps> = ({ value, mb }) => {
  return (
    <Box
      as="label"
      borderLeft="3px solid"
      borderColor="primary.600"
      fontWeight="bold"
      fontFamily="play"
      textColor="text.600"
      textTransform="uppercase"
      fontSize="xl"
      pl={4}
      py={1}
      display="block"
      my={12}
      mb={mb}
    >
      {value}
    </Box>
  )
}
