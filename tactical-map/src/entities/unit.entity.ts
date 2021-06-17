import { ICommand } from '@cohdex/shared'
import { IGameData, IUnitEntityProps } from '../types'
import { BaseEntity } from './base-entity'

export class UnitEntity
  extends BaseEntity<IUnitEntityProps>
  implements IUnitEntityProps
{
  imageUrl: string
  cappingSpeed: number
  movementSpeed: number
  isActive: boolean
  commands: ICommand[]

  constructor(props: IUnitEntityProps) {
    super(props)

    this.imageUrl = props.imageUrl
    this.cappingSpeed = props.cappingSpeed
    this.movementSpeed = props.movementSpeed
    this.isActive = props.isActive
    this.commands = props.commands
  }

  draw(gameData: IGameData) {}
}
