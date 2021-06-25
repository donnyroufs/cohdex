import { IStrategyUnit, IUnitWithCommands } from '@cohdex/shared'

export class InteractiveUnit implements IStrategyUnit {
  id: number
  unit: IUnitWithCommands
  isActive: boolean
  colour: string

  constructor(props: IStrategyUnit) {
    this.id = props.id
    this.unit = props.unit
    this.isActive = false
    this.colour = props.colour
  }
}
