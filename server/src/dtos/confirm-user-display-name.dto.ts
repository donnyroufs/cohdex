import { IConfirmUserDisplayNameDto } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'
import { DTO } from '../lib'

export class ConfirmUserDisplayNameDto
  extends DTO<IConfirmUserDisplayNameDto>
  implements IConfirmUserDisplayNameDto
{
  @Expose()
  @IsNumber()
  userId: number

  @Expose()
  @IsString()
  displayName: string
}
