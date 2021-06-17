import { GameState, ITacticalMapOptions } from './types'
import { Renderer } from './renderer'
import onChange from 'on-change'
import { SceneHandler } from './scene.handler'
import { PreloadScene } from './scenes/preload.scene'
import { GameScene } from './scenes/game.scene'
import { IPointPosition, IStrategyUnit } from '@cohdex/shared'
import { UnitEntity } from './entities/unit.entity'
import { Vec2 } from './math/vec2.math'
import { ImageUtil } from './utils/image.util'

export class TacticalMap {
  public initialized = false
  private _state: GameState
  private _renderer: Renderer
  private _sceneHandler: SceneHandler
  private _options: ITacticalMapOptions

  async init(options: ITacticalMapOptions) {
    this._options = options

    this._state = onChange(
      {
        entities: [],
        spawnpoint: null,
      },
      (prop, value) => options.syncStateHandler(prop, value, this._state)
    )

    this._state.spawnpoint = options.strategy.spawnPoint

    this._renderer = new Renderer(options.rendererOptions)
    // @ts-expect-error different update method so it complains
    this._sceneHandler = new SceneHandler([PreloadScene, GameScene])

    options.syncStateHandler(undefined!, undefined!, this._state)

    this.initialized = true
  }

  async start() {
    await this._sceneHandler.setCurrentAndStart(PreloadScene, {
      renderer: this._renderer,
      strategy: this._options.strategy,
      basePath: this._options.basePath,
      gameState: this._state,
    })
  }

  async addUnit(unit: IStrategyUnit) {
    const _unit = await this.strategyUnitToUnitEntity(unit)
    this._state.entities.push(_unit)
  }

  selectUnit(unitId: number) {
    const state = this.getGameState()

    state.entities.forEach((e) => {
      if (e instanceof UnitEntity) {
        if (e.id === unitId) return (e.isActive = !e.isActive)
        e.isActive = false
      }
    })
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
      entities: [],
      spawnpoint: null,
    }
  }

  private async strategyUnitsToUnitEntities(units: IStrategyUnit[]) {
    const _units: UnitEntity[] = []

    for (const u of units) {
      const unit = await this.strategyUnitToUnitEntity(u)
      _units.push(unit)
    }

    return _units
  }

  private async strategyUnitToUnitEntity(u: IStrategyUnit) {
    const image = await ImageUtil.loadAsyncImage(
      this._options.basePath + u.unit.image
    )

    return new UnitEntity({
      id: u.id,
      cappingSpeed: u.unit.cappingSpeed,
      movementSpeed: u.unit.movementSpeed,
      name: u.unit.name,
      isActive: false,
      height: image.height,
      width: image.width,
      pos: new Vec2(0, 0),
      imageUrl: u.unit.image,
      commands: u.unit.commands,
    })
  }
}
