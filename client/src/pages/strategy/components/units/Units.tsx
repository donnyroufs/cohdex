import { Box, Flex, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { useProviders } from '../../../../hooks/useProviders'
import { InteractiveUnit } from '../../../../models/InteractiveUnit'
import { GameState } from '../../../../types'
import { SelectUnit } from './SelectUnit'
import { Unit } from './Unit'

export interface IUnitsProps {
  handleOnAdd: (id: number) => void
  handleSelectUnit: (id: number) => void
  gameState?: GameState
  activeUnit?: InteractiveUnit
  updateLocalUnitColour(id: number, colour: string): void
  removeLocalUnit(id: number): void
}

export const Units: React.FC<IUnitsProps> = ({
  handleOnAdd,
  gameState,
  handleSelectUnit,
  activeUnit,
  updateLocalUnitColour,
  removeLocalUnit,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { strategyService } = useProviders()

  function handleClick() {
    setIsOpen((curr) => !curr)
  }

  function handleClose(e: Event) {
    // @ts-ignore
    if (e.target.nodeName === 'path') return
    // @ts-ignore
    if (e.target.ariaLabel === 'add unit') return

    setIsOpen(false)
  }

  async function handleRemoveUnit(id: number) {
    await strategyService.removeUnitFromStrategy({ id })
    removeLocalUnit(id)
  }

  return (
    <Flex flexDir="column" mr={4} position="relative">
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
        onClick={handleClick}
      />
      {isOpen && (
        <SelectUnit
          units={gameState?.strategyData?.units}
          handleOnAdd={handleOnAdd}
          handleClose={handleClose}
        />
      )}
      {gameState &&
        [...gameState.units]
          .sort((a, b) => a.id - b.id)
          .map(({ id, unit, colour }) => (
            <Unit
              {...unit}
              colour={colour}
              id={id}
              activeUnit={activeUnit}
              handleSelectUnit={handleSelectUnit}
              handleRemoveUnit={handleRemoveUnit}
              updateLocalUnitColour={updateLocalUnitColour}
            />
          ))}
    </Flex>
  )
}
