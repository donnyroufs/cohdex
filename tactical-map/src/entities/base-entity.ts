import { Vec2 } from '../math/vec2.math'
import { IBaseEntityProps, IGameData } from '../types'

export class BaseEntity<T extends IBaseEntityProps = IBaseEntityProps> {
  public readonly id: number
  public readonly name: string
  public readonly pos: Vec2
  public readonly height: number
  public readonly width: number
  // public readonly image: HTMLImageElement

  get x() {
    return this.pos.x
  }

  get y() {
    return this.pos.y
  }

  // // Will become trouble some if it's not a 1:1 ratio
  get size() {
    return Math.max(this.height, this.width)
  }

  constructor(props: T) {
    this.id = props.id
    this.name = props.name
    this.height = props.height
    this.width = props.width
    this.pos = props.pos
  }

  draw(gameData: IGameData) {
    // gameData.renderer.drawEntity(this)
  }
}
