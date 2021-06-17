import { UnitCommand } from '.prisma/client'
import { ICommand } from '@cohdex/shared'

export class Command implements ICommand {
  id: number
  description: string
  type: UnitCommand

  constructor(props: ICommand) {
    this.id = props.id
    this.description = props.description
    this.type = props.type
  }
}
