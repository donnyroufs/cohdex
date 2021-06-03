import { Vec2 } from '../math/vec2.math'
import { IBaseEntityProps, IGameData } from '../types'

export class BaseEntity<T extends IBaseEntityProps = IBaseEntityProps> {
  protected readonly image: HTMLImageElement

  get x() {
    return this.props.pos.x
  }

  get y() {
    return this.props.pos.y
  }

  get height() {
    return this.props.height
  }

  get width() {
    return this.props.width
  }

  constructor(protected readonly props: T) {
    this.image = props.image
  }

  draw(gameData: IGameData) {
    gameData.renderer.drawImage(
      this.image,
      this.height,
      this.width,
      this.props.pos
    )
  }

  getPosInVec2() {
    return new Vec2(this.x, this.y)
  }
}
