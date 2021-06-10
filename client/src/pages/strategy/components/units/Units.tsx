import { Flex, IconButton, Image } from '@chakra-ui/react'
import { GameState } from '@cohdex/tactical-map'
import { FaPlusCircle } from 'react-icons/fa'

export interface IUnitsProps {
  handleOnAdd: () => void
  gameState?: GameState
}

export const Units: React.FC<IUnitsProps> = ({ handleOnAdd, gameState }) => {
  return (
    <Flex flexDir="column" mr={4}>
      <IconButton
        icon={<FaPlusCircle size={20} />}
        display="flex"
        justifyContent="center"
        alignItems="center"
        border="1px solid"
        borderColor="border"
        h="98px"
        w="74px"
        aria-label="add unit"
        variant="unstyled"
        _focus={{
          outline: 'none',
        }}
        mb={4}
        onClick={handleOnAdd}
      />
      {gameState &&
        gameState.units.map(({ unit }) => (
          <Image
            mb={4}
            h="98px"
            w="74px"
            border="2px solid"
            borderColor={
              gameState.units.find((u) => u.unit.id === unit.id)
                ? 'primary.600'
                : 'border'
            }
            src={process.env.REACT_APP_BASE_URL + unit.image}
            alt="unit portrait"
            opacity="0.7"
            transition="all .15s ease-in-out"
            _hover={{
              cursor: 'pointer',
              opacity: 1,
              borderColor: 'primary.600',
            }}
          />
        ))}
    </Flex>
  )
}
