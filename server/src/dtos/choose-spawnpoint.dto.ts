import { IChooseSpawnpointDto } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { DTO } from '../lib'

export class ChooseSpawnPointDto
  extends DTO<IChooseSpawnpointDto>
  implements IChooseSpawnpointDto
{
  @IsNumber()
  @Expose()
  strategyId: number

  @IsNumber()
  @Expose()
  spawnpoint: number

  @IsNumber()
  @Expose()
  userId: number
}
