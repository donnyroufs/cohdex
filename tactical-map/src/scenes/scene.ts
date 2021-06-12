import { GameData } from '../game-data'
import { SceneContext } from '../scene.context'
import { SceneHandler } from '../scene.handler'

export abstract class Scene {
  constructor(protected readonly sceneHandler: SceneHandler) {}

  abstract setup(payload: SceneContext): Promise<void> | void
  update(gameData: GameData) {}
}
