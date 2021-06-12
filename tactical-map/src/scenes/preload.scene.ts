import { Scene } from './scene'
import { IGameSceneContext, IPreloadSetupProps } from '../types'
import { GameScene } from './game.scene'
import { AssetLoader } from '../loaders/asset.loader'
import { IStrategy } from '../../../shared/dist'
import { GameData } from '../game-data'

export class PreloadScene extends Scene {
  private _strategy!: IStrategy

  async setup({
    assetLoader,
    renderer,
    strategy,
    basePath,
  }: IPreloadSetupProps): Promise<void> {
    const map = strategy.Map

    assetLoader = new AssetLoader(
      {
        fileName: map.name,
        url: map.url,
      },
      AssetLoader.toAssetsToLoad(map.pointPositions, basePath)
    )

    await assetLoader.setup()
    renderer.calculateAndSetScale(map)

    this.sceneHandler.setCurrentAndStart<IGameSceneContext>(GameScene, {
      assetLoader: assetLoader,
      map,
      renderer: renderer,
    })
  }
}
