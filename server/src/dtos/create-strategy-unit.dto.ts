import { ICreateStrategyUnitDto } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { DTO } from '../lib'

export class CreateStrategyUnitDto
  extends DTO<ICreateStrategyUnitDto>
  implements ICreateStrategyUnitDto
{
  @Expose()
  @IsNumber()
  unitId: number

  @Expose()
  @IsNumber()
  strategyId: number
}
