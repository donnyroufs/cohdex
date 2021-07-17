import { Image } from '@chakra-ui/react'
import { IPointPosition } from '@cohdex/shared'

export interface IPointPositionProps {
  point: IPointPosition
  scale: number
  onClickPointPosition(point: IPointPosition): void
}

export const PointPosition: React.FC<IPointPositionProps> = ({
  point,
  onClickPointPosition,
  scale,
}) => {
  console.log(process.env)

  const imageUrl = '/images/' + point.fileName + '.png'

  const x = 350 - point.x * scale - 16
  const y = 350 - point.y * scale - 16

  return (
    <Image
      src={imageUrl}
      alt={point.fileName}
      position="absolute"
      top={y}
      right={x}
      h="32px"
      w="32px"
      onMouseOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onMouseOut={() => {
        document.body.style.cursor = 'default'
      }}
      onClick={() => onClickPointPosition(point)}
    />
  )
}
