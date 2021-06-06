import { Box } from '@chakra-ui/layout'

export interface ICommandProps {
  content: string
}

export const Command: React.FC<ICommandProps> = ({ content }) => {
  return (
    <Box
      border="1px solid"
      borderColor="#1F2938"
      p={4}
      w="100%"
      background="header"
      color="text.600"
      userSelect="none"
    >
      {content}
    </Box>
  )
}
