import { AssetLoader } from './loaders/asset.loader'
import { Renderer } from './renderer'

export class SceneContext {
  renderer: Renderer
  assetLoader: AssetLoader
}
