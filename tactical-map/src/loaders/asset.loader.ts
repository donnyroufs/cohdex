import { IPointPosition } from '@cohdex/shared'
import { ImageUtil } from '../utils/image.util'

export interface IAssetToLoad {
  url: string
  fileName: string
}

export class AssetLoader {
  /**
   * Preload assets that we know need to be loaded already
   */
  private readonly _assetsToLoad: IAssetToLoad[] = []
  private readonly _assets: Map<string, HTMLImageElement> = new Map()

  constructor(map: IAssetToLoad, _assetsToLoad: IAssetToLoad[]) {
    this._assetsToLoad = _assetsToLoad
    this._assetsToLoad.push(map)
  }

  public async setup() {
    const batch = this._assetsToLoad.map(async ({ url, fileName }) => {
      await this.load(url, fileName)
    })
    await Promise.all(batch)
  }

  public async load(url: string, key?: string) {
    const pngified = this.tgaToPng(url)
    const image = await ImageUtil.loadAsyncImage(pngified)
    this._assets.set(key || pngified, image)
    return this
  }

  public getImage(key: string) {
    const image = this._assets.get(this.tgaToPng(key))

    if (!image) {
      throw new Error(`The image with the key: ${key} was not found.`)
    }

    return image
  }

  private tgaToPng(url: string) {
    return url.replace('tga', 'png')
  }

  static urlToFileName(url: string) {
    const splitUrl = url.split('/')
    const fileName = splitUrl[splitUrl.length - 1]

    const hasExtension = fileName.includes('png') || fileName.includes('tga')

    return hasExtension ? fileName.split('.')[0] : fileName
  }

  static toAssetsToLoad(positions: IPointPosition[], basePath: string) {
    return [...new Set(positions.map((pos) => pos.fileName))].map(
      (fileName) => ({
        url: `${basePath}/public/${fileName}.png`,
        fileName: fileName,
      })
    )
  }
}
