import { Box } from '@chakra-ui/layout'

export interface ICommandProps {
  content: string
  id: number
  handleClick(id: number): Promise<void>
}

export const Command: React.FC<ICommandProps> = ({
  content,
  handleClick,
  id,
}) => {
  return (
    <Box
      onClick={() => handleClick(id)}
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
