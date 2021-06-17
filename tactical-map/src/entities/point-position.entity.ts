import { Vec2 } from '../math/vec2.math'
import { IGameData, IPointPositionEntity } from '../types'
import { BaseEntity } from './base-entity'

/**
 * COH Map Icons
 */
export class PointPositionEntity
  extends BaseEntity<IPointPositionEntity>
  implements IPointPositionEntity
{
  imageUrl: string
  image: HTMLImageElement

  constructor(props: IPointPositionEntity) {
    super(props)
    this.imageUrl = props.imageUrl
    this.image = props.image
    this.pos.y = this.flipY(props.pos.y)
  }

  draw(gameData: IGameData) {
    gameData.renderer.drawEntity(this, gameData.assetLoader)
    // gameData.renderer.drawCollisionBox(this)
  }

  /**
   * Y coordinate for map icons need to be flipped
   */
  private flipY(pos: number) {
    return pos < 0 ? Math.abs(pos) : 0 - pos
  }
}
