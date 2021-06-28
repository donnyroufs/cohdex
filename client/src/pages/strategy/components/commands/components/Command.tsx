import { Box } from '@chakra-ui/layout'

export interface ICommandProps {
  content: string
  id: number
  description: string
  handleClick(e: MouseEvent, id: number): Promise<void>
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
      border="1px solid"
      borderColor="#1F2938"
      p={4}
      w="100%"
      background="header"
      color="text.600"
      userSelect="none"
      onClick={(e: any) => handleClick(e, id)}
      onContextMenu={(e: any) => handleClick(e, id)}
    >
      {content + ' ' + description.toUpperCase()}
    </Box>
  )
}
