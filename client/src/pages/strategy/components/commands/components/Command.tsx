import { Box } from '@chakra-ui/layout'

export interface ICommandProps {
  content: string
  id: number
  description: string
  handleClick(id: number): Promise<void>
}

export const Command: React.FC<ICommandProps> = ({
  content,
  handleClick,
  id,
  description,
}) => {
  return (
    <Box
      mb={4}
      onClick={() => handleClick(id)}
      border="1px solid"
      borderColor="#1F2938"
      p={4}
      w="100%"
      background="header"
      color="text.600"
      userSelect="none"
    >
      {content + ' ' + description.toUpperCase()}
    </Box>
  )
}
