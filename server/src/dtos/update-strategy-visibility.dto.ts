import { IUpdateStrategyVisibilityDto, Visibility } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'
import { DTO } from '../lib'

export class UpdateStrategyVisibilityDto
  extends DTO<IUpdateStrategyVisibilityDto>
  implements IUpdateStrategyVisibilityDto
{
  @Expose()
  @IsString()
  visibility: Visibility

  @Expose()
  @IsNumber()
  strategyId: number

  @Expose()
  @IsNumber()
  userId: number
}
