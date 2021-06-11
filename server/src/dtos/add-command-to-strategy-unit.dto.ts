import { UnitCommand } from '.prisma/client'
import { IAddCommandToStrategyUnitDto } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'
import { DTO } from '../lib'

export class AddCommandToStrategyUnitDto
  extends DTO<IAddCommandToStrategyUnitDto>
  implements IAddCommandToStrategyUnitDto
{
  @Expose()
  @IsString()
  type: UnitCommand

  @Expose()
  @IsString()
  description: string

  @Expose()
  @IsNumber()
  strategyUnitsId: number

  @Expose()
  @IsNumber()
  userId: number
}
