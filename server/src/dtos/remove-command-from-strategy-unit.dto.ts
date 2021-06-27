import { IRemoveUnitFromStrategyDto } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { DTO } from '../lib'

export class RemoveCommandFromStrategyUnitDto
  extends DTO<IRemoveUnitFromStrategyDto>
  implements IRemoveUnitFromStrategyDto
{
  @Expose()
  @IsNumber()
  id: number

  @Expose()
  @IsNumber()
  userId: number
}
