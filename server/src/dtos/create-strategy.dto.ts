import { IsDefined, IsNumber, IsString } from 'class-validator'

export class CreateStrategyDto {
  @IsDefined()
  @IsString()
  title: string

  @IsDefined()
  @IsNumber()
  alliesFactionId: number

  @IsDefined()
  @IsNumber()
  axisFactionId: number

  @IsDefined()
  @IsNumber()
  factionId: number

  @IsDefined()
  @IsNumber()
  mapId: number

  @IsDefined()
  @IsNumber()
  userId: number

  constructor(props: CreateStrategyDto) {
    this.title = props.title
    this.alliesFactionId = props.alliesFactionId
    this.axisFactionId = props.axisFactionId
    this.factionId = props.factionId
    this.mapId = props.mapId
    this.userId = props.userId
  }
}
