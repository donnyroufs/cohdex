import { Box, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { IUnitWithCommands } from '../../../../../../shared/dist'
import { useProviders } from '../../../../hooks/useProviders'
import { InteractiveUnit } from '../../../../models/InteractiveUnit'
import { UnitColourPicker } from './UnitColourPicker'

export interface IUnitProps extends IUnitWithCommands {
  handleSelectUnit: (id: number) => void
  activeUnit?: InteractiveUnit
  colour: string
  updateLocalUnitColour(id: number, colour: string): void
  handleRemoveUnit(id: number): Promise<void>
  isOwner: boolean
}

export const Unit: React.FC<IUnitProps> = ({
  handleSelectUnit,
  activeUnit,
  isOwner,
  id,
  image,
  colour,
  updateLocalUnitColour,
  handleRemoveUnit,
}) => {
  const { strategyService } = useProviders()
  const [currentColour, setCurrentColour] = useState(colour)

  return (
    <Box position="relative">
      <Image
        key={id}
        onContextMenu={(e) => {
          if (e.type !== 'contextmenu') return
          e.preventDefault()

          handleRemoveUnit(id)
        }}
        onClick={() => handleSelectUnit(id)}
        mb={4}
        h="84px"
        w="74px"
        border="2px solid"
        borderColor={activeUnit?.id === id ? 'primary.600' : 'border'}
        src={process.env.REACT_APP_BASE_URL + '/public' + image}
        alt="unit portrait"
        opacity={activeUnit?.id === id ? 1 : 0.7}
        transition="all .15s ease-in-out"
        _hover={{
          cursor: 'pointer',
          opacity: 1,
          borderColor: 'primary.600',
        }}
      />
      <UnitColourPicker
        id={id}
        isOwner={isOwner}
        updateLocalUnitColour={updateLocalUnitColour}
        colour={currentColour}
        onChange={(e) => {
          setCurrentColour(e.toString())
          strategyService.changeUnitColour(
            {
              colour: colour.toString(),
            },
            id
          )
        }}
      />
    </Box>
  )
}
