import { Image, Skeleton } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useLoadImage } from '../../../../hooks'
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
  const [isLoaded] = useLoadImage(imgUrl)
  const isSelected = useMemo(() => selected && selected === id, [id, selected])

  return (
    <Skeleton
      h={{ sm: 24, md: 32 }}
      w={{ sm: 24, md: 32 }}
      isLoaded={isLoaded}
      startColor="background.700"
      endColor="background.800"
    >
      <Image
        src={'/images' + imgUrl}
        alt={alt}
        onClick={() => onSelect(id, alt)}
        backgroundColor="badge"
        h={{ sm: 24, md: 32 }}
        w={{ sm: 24, md: 32 }}
        p={4}
        border="1px solid"
        borderColor={isSelected ? 'primary.600' : 'border'}
        opacity={isSelected ? '1' : '0.5'}
        transition="all .2s ease"
        _hover={{
          cursor: 'pointer',
          opacity: 1,
          borderColor: 'primary.600',
        }}
      />
    </Skeleton>
  )
}
