import { Expose } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'
import { IGetStrategyDto } from '../../../shared/dist'
import { DTO } from '../lib'

export class GetOneStrategyDto
  extends DTO<IGetStrategyDto>
  implements IGetStrategyDto
{
  @Expose()
  @IsNumber()
  id: number

  @Expose()
  @IsString()
  slug: string
}
