import { IStrategyMap, IStrategyUnit } from '@cohdex/shared'
import { BASE_ENTITY_SIZE } from '../constants'
import { BaseEntity } from '../entities/base-entity'
import { PointPositionEntity, UnitEntity } from '../entities'
import { GameData } from '../game-data'
import { AssetLoader } from '../loaders/asset.loader'
import { Vec2 } from '../math/vec2.math'
import { GameState, IGameSceneContext } from '../types'
import { World } from '../world'
import { Scene } from './scene'
import { Command } from '../command'

export class GameScene extends Scene {
  private _gameData: GameData
  // TODO: Remove
  private _world: World

  setup({
    renderer,
    assetLoader,
    map,
    gameState,
    units,
  }: IGameSceneContext): void | Promise<void> {
    this._world = new World(map)
    this._gameData = new GameData(renderer, assetLoader)

    renderer.bindMouseEvent('mousemove', (pos) => {
      const collidedEntity = gameState.entities.some((entity) => {
        if (entity instanceof PointPositionEntity) {
          return entity.pos.getDistance(pos) <= entity.size / 2
        }
      })

      if (collidedEntity) {
        document.body.style.cursor = 'pointer'
        return
      }

      document.body.style.cursor = 'default'
    })

    renderer.bindMouseEvent('click', (pos) => {
      const activeUnit = gameState.entities.find((e) => {
        if (e instanceof UnitEntity) {
          return e
        }
      }) as UnitEntity | undefined

      if (!activeUnit) return

      const collidedEntity = gameState.entities.some((entity) => {
        if (entity instanceof PointPositionEntity) {
          return entity.pos.getDistance(pos) <= entity.size / 2
        }
      })

      if (collidedEntity) {
        activeUnit.commands.push(
          new Command({
            id: activeUnit.commands.length + 1,
            description: 'some info',
            type: 'CAPTURE',
          })
        )
        return
      }
    })

    this.setupEntities(map, assetLoader, gameState, units)

    this.update(gameState)
  }

  // @ts-ignore
  update(gameState: GameState) {
    this._world.draw(this._gameData)
    gameState.entities.forEach((entity) => entity.draw(this._gameData))

    window.requestAnimationFrame(() => this.update(gameState))
  }

  private setupEntities(
    map: IStrategyMap,
    assetLoader: AssetLoader,
    gameState: GameState,
    units: IStrategyUnit[]
  ) {
    units.forEach((u) => {
      gameState.entities.push(
        new UnitEntity({
          ...u.unit,
          isActive: false,
          imageUrl: u.unit.image,
          height: 32,
          width: 32,
          pos: new Vec2(0, 0),
          id: u.id,
        })
      )
    })

    map.pointPositions.forEach((point, index) => {
      gameState.entities.push(
        new PointPositionEntity({
          name: point.fileName,
          height: BASE_ENTITY_SIZE,
          width: BASE_ENTITY_SIZE,
          image: assetLoader.getImage(point.fileName),
          pos: new Vec2(point.x, point.y),
          id: point.id,
          imageUrl: point.fileName,
        })
      )
    })
  }
}
