import { IUpdateStrategyUnitColourDto } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'
import { DTO } from '../lib'

export class UpdateStrategyUnitColourDto
  extends DTO<IUpdateStrategyUnitColourDto>
  implements IUpdateStrategyUnitColourDto
{
  @Expose()
  @IsNumber()
  id: number

  @Expose()
  @IsString()
  colour: string

  @Expose()
  @IsNumber()
  userId: number
}
