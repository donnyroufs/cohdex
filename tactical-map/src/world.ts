import { IStrategyMap } from '@cohdex/shared'
import { IGameData } from './types'

export class World {
  constructor(private readonly _map: IStrategyMap) {}

  draw(gameData: IGameData) {
    const img = gameData.assetLoader.getImage(this._map.name)
    const pos = gameData.renderer.getTopLeftPos()
    gameData.renderer.drawUnscaledImage(img, pos)
  }
}
