import { ICommand } from '@cohdex/shared'
import { Command } from '../command'
import { IGameData, IUnitEntityProps, Tick } from '../types'
import { BaseEntity } from './base-entity'

export class UnitEntity
  extends BaseEntity<IUnitEntityProps>
  implements IUnitEntityProps
{
  imageUrl: string
  cappingSpeed: number
  movementSpeed: number
  isActive: boolean
  commands: Command[]

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
