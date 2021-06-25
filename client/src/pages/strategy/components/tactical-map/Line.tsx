import { InteractiveUnit } from '../../../../models/InteractiveUnit'
import { singleCoordinateToScreen } from '../../../../utils/singleCooridnateToScreen'

export interface ILineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  scale: number
  colour: string
  activeUnit?: InteractiveUnit
  id: number
}

// TODO: add is active
export const Line: React.FC<ILineProps> = ({
  x1,
  x2,
  y1,
  y2,
  scale,
  colour,
  activeUnit,
  id,
}) => {
  const isUnit = activeUnit?.id === id
  const opacity = isUnit ? 1 : 0.25

  return (
    <line
      x1={singleCoordinateToScreen(-x1, scale)}
      y1={singleCoordinateToScreen(y1, scale)}
      x2={singleCoordinateToScreen(-x2, scale)}
      y2={singleCoordinateToScreen(y2, scale)}
      style={{
        stroke: colour,
        strokeWidth: 5,
        opacity: activeUnit ? opacity : 1,
      }}
    />
  )
}
