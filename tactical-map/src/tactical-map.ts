import { GameState, ITacticalMapOptions } from './types'
import { Renderer } from './renderer'
import onChange from 'on-change'
import { SceneHandler } from './scene.handler'
import { PreloadScene } from './scenes/preload.scene'
import { GameScene } from './scenes/game.scene'
import { IStrategyUnit } from '@cohdex/shared'

export class TacticalMap {
  public initialized = false
  private _state: GameState
  private _renderer: Renderer
  private _sceneHandler: SceneHandler
  private _options: ITacticalMapOptions

  init(options: ITacticalMapOptions) {
    this._options = options

    this._state = onChange(
      { units: [...options.strategy.StrategyUnits] },
      (prop, value) => options.syncStateHandler(prop, value, this._state)
    )

    this._renderer = new Renderer(options.rendererOptions)
    this._sceneHandler = new SceneHandler([PreloadScene, GameScene])

    options.syncStateHandler(undefined!, undefined!, this._state)

    this.initialized = true
  }

  async start() {
    await this._sceneHandler.setCurrentAndStart(PreloadScene, {
      renderer: this._renderer,
      map: this._options.strategy.Map,
      basePath: this._options.basePath,
    })
  }

  addUnit(unit: IStrategyUnit) {
    console.log('adding unit', unit)
    this._state.units.push(unit)
  }

  /**
   * Used to do logic outside of TMap
   */
  getGameState() {
    return this._state
  }
}
