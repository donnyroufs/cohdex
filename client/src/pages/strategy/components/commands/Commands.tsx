import { Box, Text } from '@chakra-ui/react'
import { InteractiveUnit } from '../../Strategy'
import { Command } from './components/Command'

export interface ICommandsProps {
  activeUnit?: InteractiveUnit
}

export const Commands: React.FC<ICommandsProps> = ({ activeUnit }) => {
  return (
    <Box mt={0} flex={1} minW="350px">
      {activeUnit &&
        activeUnit.unit.commands &&
        activeUnit.unit.commands.map((command) => (
          <Command content={command.type} key={command.id} />
        ))}

      {!activeUnit && (
        <Text p={4} background="header">
          Get started by adding and or selecting a unit!
        </Text>
      )}
      {activeUnit && activeUnit.unit.commands.length <= 0 && (
        <Text p={4} background="header">
          This unit does not have commands yet!
        </Text>
      )}
    </Box>
  )
}
