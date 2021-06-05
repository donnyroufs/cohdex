import { Vec2 } from '../math/vec2.math'
import { IBaseEntityProps, IGameData } from '../types'

export class BaseEntity<T extends IBaseEntityProps = IBaseEntityProps> {
  public readonly image: HTMLImageElement

  get name() {
    return this.props.name
  }

  get pos() {
    return new Vec2(this.x, this.y)
  }

  get x() {
    return this.props.pos.x
  }

  get y() {
    return this.flipY(this.props.pos.y)
  }

  get height() {
    return this.props.height
  }

  get width() {
    return this.props.width
  }

  // Will become trouble some if it's not a 1:1 ratio
  get size() {
    return Math.max(this.height, this.width)
  }

  constructor(protected readonly props: T) {
    this.image = props.image
  }

  draw(gameData: IGameData) {
    gameData.renderer.drawEntity(this)
  }

  /**
   * Y coordinate for map icons need to be flipped
   */
  private flipY(pos: number) {
    return pos < 0 ? Math.abs(pos) : 0 - pos
  }
}
