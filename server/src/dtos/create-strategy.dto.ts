import { ICreateStrategyDto } from '@cohdex/shared'
import { Expose } from 'class-transformer'
import { IsNumber, IsString, Length, Matches } from 'class-validator'
import { DTO } from '../lib'

export class CreateStrategyDto extends DTO<ICreateStrategyDto> {
  @Expose()
  @IsString()
  @Length(6, 42)
  @Matches(RegExp(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/), {
    message: 'A title cannot contain special characters.',
  })
  title: string

  @Expose()
  @IsNumber()
  userId: number

  @Expose()
  @IsNumber()
  mapId: number

  @Expose()
  @IsNumber()
  factionId: number

  @Expose()
  @IsNumber()
  alliedFactionId: number

  @Expose()
  @IsNumber()
  axisFactionId: number
}
