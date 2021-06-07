import { Flex, IconButton } from '@chakra-ui/react'
import { FaPlusCircle } from 'react-icons/fa'

export interface IUnitsProps {
  handleOnAdd: () => void
}

export const Units: React.FC<IUnitsProps> = ({ handleOnAdd }) => {
  return (
    <Flex flexDir="column" mr={4}>
      <IconButton
        icon={<FaPlusCircle size={20} />}
        display="flex"
        justifyContent="center"
        alignItems="center"
        border="1px solid"
        borderColor="border"
        h="88px"
        w="64px"
        aria-label="add unit"
        variant="unstyled"
        _focus={{
          outline: 'none',
        }}
        onClick={handleOnAdd}
      />
    </Flex>
  )
}
