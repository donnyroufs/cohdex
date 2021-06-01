import { IStrategy } from '@cohdex/shared'

export class TacticalMap {
  private readonly _canvas: HTMLCanvasElement
  private readonly _strategy: IStrategy
  private readonly _height: number
  private readonly _width: number

  constructor(
    canvas: HTMLCanvasElement,
    strategy: IStrategy,
    height: number,
    width: number
  ) {
    this._canvas = canvas
    this._strategy = strategy
    this._height = height
    this._width = width
  }

  async start() {
    this.setCanvasDimensions()

    const ctx = this._canvas.getContext('2d')!
    const { height, width, url } = this._strategy.Map

    const img = new Image()
    img.src = url

    const scaleX = this._canvas.width / width
    const scaleY = this._canvas.height / height

    const CANVAS_HEIGHT = height * scaleY
    const CANVAS_WIDTH = width * scaleX

    img.onload = () => {
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      const points = this._strategy.Map.pointPositions
      points.forEach((point) => {
        const isSpawnPoint = point.fileName.includes('starting')
        const spawnLocation = isSpawnPoint
          ? Number(String(point.ownerId).substr(-1)) + 1
          : 2

        const x = point.x * scaleX
        const y = point.y * scaleY

        const SIZE = 25 * scaleX

        const CENTER = CANVAS_HEIGHT / 2 - SIZE / 2

        const flip = (pos: number) => (pos < 0 ? Math.abs(pos) : 0 - pos)

        const _img = new Image()
        const fileName = isSpawnPoint
          ? point.fileName + '-' + spawnLocation
          : point.fileName
        _img.src = `${process.env.REACT_APP_BASE_URL}/public/${fileName}.png`
        _img.onload = () => {
          ctx.drawImage(_img, x + CENTER, flip(y) + CENTER, SIZE, SIZE)
        }
      })
    }
  }
  private setCanvasDimensions() {
    this._canvas.height = this._height
    this._canvas.width = this._width
  }
}
