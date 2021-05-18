export class CreateStrategyDto {
  title: string
  alliesFactionId: number
  axisFactionId: number
  factionId: number
  mapId: number
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
