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
      { units: [...options.strategy.StrategyUnits], spawnpoint: null },
      (prop, value) => options.syncStateHandler(prop, value, this._state)
    )

    this._state.spawnpoint = options.strategy.spawnPoint

    this._renderer = new Renderer(options.rendererOptions)
    this._sceneHandler = new SceneHandler([PreloadScene, GameScene])

    options.syncStateHandler(undefined!, undefined!, this._state)

    this.initialized = true
  }

  async start() {
    await this._sceneHandler.setCurrentAndStart(PreloadScene, {
      renderer: this._renderer,
      strategy: this._options.strategy,
      basePath: this._options.basePath,
    })
  }

  addUnit(unit: IStrategyUnit) {
    this._state.units.push(unit)
  }

  setSpawnpoint(spawnpoint: number) {
    this._state.spawnpoint = spawnpoint
  }

  /**
   * Used to do logic outside of TMap
   */
  getGameState() {
    return this._state
  }

  clearState() {
    this._state = {
      units: [],
      spawnpoint: null,
    }
  }
}
