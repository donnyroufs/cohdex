import { Box, Text } from '@chakra-ui/react'
import { UnitEntity } from '@cohdex/tactical-map'
import { Command } from './components/Command'

export interface ICommandsProps {
  activeUnit?: UnitEntity
}

export const Commands: React.FC<ICommandsProps> = ({ activeUnit }) => {
  return (
    <Box mt={0} flex={1} minW="350px">
      {activeUnit &&
        activeUnit.commands &&
        activeUnit.commands.map((command) => (
          <Command content={command.type} key={command.id} />
        ))}

      {!activeUnit && (
        <Text p={4} background="header">
          Get started by adding and or selecting a unit!
        </Text>
      )}
      {activeUnit && activeUnit.commands.length <= 0 && (
        <Text p={4} background="header">
          This unit does not have commands yet!
        </Text>
      )}
    </Box>
  )
}
