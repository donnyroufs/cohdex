import { AssetLoader } from './loaders/asset.loader'
import { Renderer } from './renderer'
import { IGameData } from './types'

export class GameData implements IGameData {
  constructor(
    public readonly renderer: Renderer,
    public readonly assetLoader: AssetLoader
  ) {}
}
