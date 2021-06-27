import { Box, Text } from '@chakra-ui/react'
import { InteractiveUnit } from '../../../../models/InteractiveUnit'
import { Command } from './components/Command'

export interface ICommandsProps {
  activeUnit?: InteractiveUnit
  removeCommand(id: number): Promise<void>
}

export const Commands: React.FC<ICommandsProps> = ({
  activeUnit,
  removeCommand,
}) => {
  async function handleClick(e: MouseEvent, id: number) {
    if (e.type !== 'contextmenu') return
    e.preventDefault()

    removeCommand(id)
  }

  return (
    <Box mt={0} flex={1} minW="250px" ml={16}>
      {activeUnit &&
        activeUnit.unit.commands &&
        activeUnit.unit.commands.map((command) => (
          <Command
            description={command.description}
            content={command.type}
            key={new Date(command.updatedAt).getTime()}
            id={command.id}
            handleClick={handleClick}
          />
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
