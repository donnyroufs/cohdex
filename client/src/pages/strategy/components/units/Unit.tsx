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
}

export const Unit: React.FC<IUnitProps> = ({
  handleSelectUnit,
  activeUnit,
  id,
  image,
  colour,
  updateLocalUnitColour,
}) => {
  const { strategyService } = useProviders()
  const [currentColour, setCurrentColour] = useState(colour)

  return (
    <Box position="relative">
      <Image
        key={id}
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
        updateLocalUnitColour={updateLocalUnitColour}
        colour={currentColour}
        onChange={(e) => {
          setCurrentColour(e.toString())
          strategyService.changeUnitColour({
            id,
            colour: colour.toString(),
          })
        }}
      />
    </Box>
  )
}
