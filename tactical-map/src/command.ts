import { UnitCommand } from '.prisma/client'
import { ICommand } from '@cohdex/shared'
import { Tick } from './types'

export class Command implements ICommand {
  id: number
  description: string
  type: UnitCommand
  issuedAt: Tick

  constructor(props: ICommand & { issuedAt: Tick }) {
    this.id = props.id
    this.description = props.description
    this.type = props.type
    this.issuedAt = props.issuedAt
  }
}
