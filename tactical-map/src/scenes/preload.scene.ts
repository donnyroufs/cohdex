import { Scene } from './scene'
import { IGameSceneContext, IPreloadSetupProps } from '../types'
import { GameScene } from './game.scene'
import { AssetLoader } from '../loaders/asset.loader'

export class PreloadScene extends Scene {
  async setup({
    assetLoader,
    renderer,
    map,
    basePath,
  }: IPreloadSetupProps): Promise<void> {
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
      assetLoader,
      renderer,
      map,
    })
  }
}
