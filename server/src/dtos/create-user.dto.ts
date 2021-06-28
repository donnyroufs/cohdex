import { ICreateUserDto } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'
import { DTO } from '../lib'

// TODO: Take in StreamProfile type and map accordingly.
export class CreateUserDto
  extends DTO<ICreateUserDto>
  implements ICreateUserDto
{
  @Expose()
  @IsString()
  steamId: string

  @Expose()
  @IsString()
  avatar: string

  @Expose()
  @IsString()
  profileUrl: string
}
