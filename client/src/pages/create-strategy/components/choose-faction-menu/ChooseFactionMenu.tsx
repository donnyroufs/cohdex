import { HStack } from '@chakra-ui/layout'
import {
  Identifier,
  IFactionOptions,
  OnFactionSelectFn,
} from '../../../../types'
import { ChooseFactionMenuItem } from './ChooseFactionMenuItem'

export interface IChooseFactionMenuProps {
  options: IFactionOptions[]
  onSelect: OnFactionSelectFn
  selected?: Identifier
}

export const ChooseFactionMenu: React.FC<IChooseFactionMenuProps> = ({
  options,
  onSelect,
  selected,
}) => {
  return (
    <HStack spacing={8} overflow="auto">
      {options.map((opts) => (
        <ChooseFactionMenuItem
          {...opts}
          key={opts.id}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
    </HStack>
  )
}
