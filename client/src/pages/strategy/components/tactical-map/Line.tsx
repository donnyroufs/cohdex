import { singleCoordinateToScreen } from '../../../../utils/singleCooridnateToScreen'

export interface ILineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  scale: number
  colour: string
}

// TODO: add is active
export const Line: React.FC<ILineProps> = ({
  x1,
  x2,
  y1,
  y2,
  scale,
  colour,
}) => {
  return (
    <line
      x1={singleCoordinateToScreen(-x1, scale)}
      y1={singleCoordinateToScreen(y1, scale)}
      x2={singleCoordinateToScreen(-x2, scale)}
      y2={singleCoordinateToScreen(y2, scale)}
      style={{
        stroke: colour,
        strokeWidth: 2,
        opacity: 1,
      }}
    />
  )
}
