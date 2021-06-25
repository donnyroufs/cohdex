import { Flex, IconButton, Image } from '@chakra-ui/react'
import { FaPlusCircle } from 'react-icons/fa'
import { InteractiveUnit } from '../../../../models/InteractiveUnit'
import { GameState } from '../../../../types'

export interface IUnitsProps {
  handleOnAdd: () => void
  handleSelectUnit: (id: number) => void
  gameState?: GameState
  activeUnit?: InteractiveUnit
}

export const Units: React.FC<IUnitsProps> = ({
  handleOnAdd,
  gameState,
  handleSelectUnit,
  activeUnit,
}) => {
  return (
    <Flex flexDir="column" mr={4}>
      <IconButton
        icon={<FaPlusCircle size={20} />}
        display="flex"
        justifyContent="center"
        alignItems="center"
        border="1px solid"
        borderColor="border"
        h="84px"
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
        gameState.units.map(({ id, unit }) => (
          <Image
            key={id}
            onClick={() => handleSelectUnit(id)}
            mb={4}
            h="84px"
            w="74px"
            border="2px solid"
            borderColor={activeUnit?.id === id ? 'primary.600' : 'border'}
            src={process.env.REACT_APP_BASE_URL + '/public' + unit.image}
            alt="unit portrait"
            opacity={activeUnit?.id === id ? 1 : 0.7}
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
