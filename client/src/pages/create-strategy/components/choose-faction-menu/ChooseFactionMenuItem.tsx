import { Image } from '@chakra-ui/react'
import { useMemo } from 'react'
import {
  Identifier,
  IFactionOptions,
  OnFactionSelectFn,
} from '../../../../types'

export interface IChooseFactionMenuItemProps extends IFactionOptions {
  onSelect: OnFactionSelectFn
  selected?: Identifier
}

export const ChooseFactionMenuItem: React.FC<IChooseFactionMenuItemProps> = ({
  id,
  imgUrl,
  alt,
  onSelect,
  selected,
}) => {
  const isSelected = useMemo(() => selected && selected === id, [id, selected])

  return (
    <Image
      src={process.env.REACT_APP_BASE_URL + imgUrl}
      alt={alt}
      onClick={() => onSelect(id, alt)}
      backgroundColor="badge"
      h={48}
      w={48}
      p={6}
      border="1px solid"
      borderColor={isSelected ? 'primary.600' : 'border'}
      opacity={isSelected ? '1' : '0.5'}
      _hover={{
        cursor: 'pointer',
        opacity: 1,
        borderColor: 'primary.600',
      }}
    />
  )
}
